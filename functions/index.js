const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
    origin: true, // Allow all origins during development
    // credentials: true, // Enable credentials (cookies)
});
// const cors = require("cors")({ origin: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { FieldValue } = require("firebase-admin/firestore");
admin.initializeApp();
const db = admin.firestore();

const JWT_SECRET = "DEFAULT_FALLBACK_SECRET_KEY_FOR_LOCAL_DEV";
// const JWT_SECRET = functions.config().jwt.secret || "DEFAULT_FALLBACK_SECRET_KEY_FOR_LOCAL_DEV";

const requireAdmin = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(403).json({ success: false, error: "Authentication required." });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') { // Simplified admin check
            return res.status(403).json({ success: false, error: "Admin privileges required." });
        }
        req.user = decoded; // Attach user info (userId, role) to the request
        next();
    } catch (error) {
        return res.status(403).json({ success: false, error: "Invalid or expired token." });
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(403).json({ success: false, error: "Authentication required." });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info (userId, role)
        next();
    } catch (error) {
        return res.status(403).json({ success: false, error: "Invalid or expired token." });
    }
};

async function handleLogin(data) {
    const { email, password } = data;
    if (!email || !password) {
        throw new functions.https.HttpsError('invalid-argument', 'Email and password are required.');
    }
    const userQuery = await db.collection('users').where('email', '==', email).limit(1).get();
    if (userQuery.empty) {
        throw new functions.https.HttpsError('not-found', 'Invalid credentials.');
    }
    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, userData.passwordHash);
    if (!passwordMatch) {
        throw new functions.https.HttpsError('unauthenticated', 'Invalid credentials.');
    }
    const { passwordHash, ...userProfile } = userData;
    const token = jwt.sign({ userId: userProfile.userId, role: userProfile.role }, JWT_SECRET, { expiresIn: '7d' });
    return { token, userProfile };
}

async function verifySession(token) {
    if (!token) {
        throw new functions.https.HttpsError('unauthenticated', 'No session token provided.');
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const userDoc = await db.collection('users').doc(decoded.userId).get();
    if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'User not found.');
    }
    const { passwordHash, ...userProfile } = userDoc.data();
    return userProfile;
}

async function handleAddEmployee(data, adminUser) {
    const { name, email, password, role, parentCompany, photoURL } = data;
    if (!name || !email || !password || !role || !parentCompany) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required employee details.');
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUserRef = db.collection('users').doc(); // Auto-generate ID
    const newEmployee = {
        userId: newUserRef.id,
        displayName: name,
        email,
        passwordHash,
        photoURL: photoURL || null,
        role, // e.g., 'employee'
        parentCompanyId: adminUser.userId,
        parentCompanyName: parentCompany,
        createdAt: FieldValue.serverTimestamp(),
    };

    await newUserRef.set(newEmployee);
    const { passwordHash: _, ...employeeProfile } = newEmployee;
    return employeeProfile;
}

async function handleGetEmployees(adminUser) {
    const employeesQuery = await db.collection('users')
        .where('role', '==', 'employee')
        .where('parentCompanyId', '==', adminUser.userId)
        .get();

    if (employeesQuery.empty) {
        return [];
    }

    const employees = employeesQuery.docs.map(doc => {
        const { passwordHash, ...employeeData } = doc.data();
        return employeeData;
    });

    return employees;
}

async function handleGetAllUsers(currentUser) {
    const usersSnapshot = await db.collection('users').get();
    const allUsers = [];
    usersSnapshot.forEach(doc => {
        if (doc.id !== currentUser.userId) {
            const { passwordHash, ...userData } = doc.data();
            allUsers.push(userData);
        }
    });
    return allUsers;
}

async function handleSendMessage(data, sender) {
    const { recipientId, text, chatRoomId } = data;
    if (!recipientId || !text || !chatRoomId) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required message data.');
    }

    const message = {
        senderId: sender.userId,
        text,
        timestamp: FieldValue.serverTimestamp(),
    };

    // Add message to the subcollection
    await db.collection('chats').doc(chatRoomId).collection('messages').add(message);

    // Update the lastMessage on the main chat document for previews
    await db.collection('chats').doc(chatRoomId).set({
        participants: [sender.userId, recipientId],
        lastMessage: message,
        updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    return { success: true, message: "Message sent." };
}

async function handleCreateAnnouncement(data, adminUser) {
    const { title, content, category, categoryColor, imageUrl, isPinned } = data;
    if (!title || !content || !category) {
        throw new functions.https.HttpsError('invalid-argument', 'Title, content, and category are required.');
    }

    const userDoc = await db.collection('users').doc(adminUser.userId).get();
    if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Admin user profile not found.');
    }
    const adminProfile = userDoc.data();

    const announcementRef = db.collection('announcements').doc();
    const newAnnouncement = {
        id: announcementRef.id,
        authorId: adminUser.userId,
        author: adminProfile.displayName,
        role: adminProfile.role,
        avatar: adminProfile.photoURL || `https://ui-avatars.com/api/?name=${adminProfile.displayName}&background=312E81&color=fff`,
        timestamp: FieldValue.serverTimestamp(),
        category,
        categoryColor: categoryColor || 'blue',
        title,
        content,
        imageUrl: imageUrl || null,
        isPinned: isPinned || false,
    };

    await announcementRef.set(newAnnouncement);
    return newAnnouncement;
}

async function handleGetAnnouncements() {
    const snapshot = await db.collection('announcements').orderBy('isPinned', 'desc').orderBy('timestamp', 'desc').get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => doc.data());
}

// --- MAIN API HANDLER (Updated Structure) ---

exports.apiHandler = functions.https.onRequest((req, res) => {

    // Set CORS headers manually as a backup
    res.set('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:5173');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    cors(req, res, () => {
        // 2. Run cookie parser middleware next.
        cookieParser()(req, res, async () => {
            // 3. Now, handle your actual API logic.
            if (req.method !== "POST") {
                return res.status(405).send("Method Not Allowed");
            }

            const { type, data } = req.body;

            try {
                let result;
                switch (type) {
                    case "login":
                        const { token, userProfile } = await handleLogin(data);
                        res.cookie('authToken', token, {
                            httpOnly: true,
                            secure: false,
                            // secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 7 * 24 * 60 * 60 * 1000
                        });
                        result = userProfile;
                        break;

                    case "verifySession":
                        result = await verifySession(req.cookies.authToken);
                        break;

                    case "logout":
                        res.clearCookie('authToken');
                        result = { success: true, message: "Logged out successfully." };
                        break;

                    case "addEmployee":
                        // First, run the admin check middleware
                        requireAdmin(req, res, async () => {
                            try {
                                result = await handleAddEmployee(data, req.user);
                                res.status(200).json(result);
                            } catch (error) {
                                res.status(error.code === 'invalid-argument' ? 400 : 500).json({ success: false, error: error.message });
                            }
                        });

                        try {
                            // We are creating a mock admin user object to pass to the function
                            const mockAdminUser = { userId: "pm_admin_01", role: "admin" };
                            result = await handleAddEmployee(data, mockAdminUser);
                            res.status(200).json(result);
                        } catch (error) {
                            res.status(error.code === 'invalid-argument' ? 400 : 500).json({ success: false, error: error.message });
                        }
                        return; // Return early as requireAdmin handles the response

                    case "getEmployees":
                        // requireAdmin(req, res, async () => {
                        //     try {
                        //         result = await handleGetEmployees(req.user);
                        //         res.status(200).json(result);
                        //     } catch (error) {
                        //         res.status(500).json({ success: false, error: error.message });
                        //     }
                        // });
                        // return;
                        try {
                            // We are creating a mock admin user object to pass to the function
                            const mockAdminUser = { userId: "pm_admin_01", role: "admin" };
                            result = await handleGetEmployees(mockAdminUser);
                            res.status(200).json(result);
                        } catch (error) {
                            res.status(error.code === 'invalid-argument' ? 400 : 500).json({ success: false, error: error.message });
                        }

                    // case "getAllUsers":
                    //     requireAuth(req, res, async () => {
                    //         result = await handleGetAllUsers(req.user);
                    //         res.status(200).json(result);
                    //     });
                    //     return;

                    // case "sendMessage":
                    //     requireAuth(req, res, async () => {
                    //         result = await handleSendMessage(data, req.user);
                    //         res.status(200).json(result);
                    //     });
                    //     return;

                    case "getAllUsers":
                        const mockAdminUser = { userId: "pm_admin_01", role: "admin" };
                        result = await handleGetAllUsers(mockAdminUser);
                        res.status(200).json(result);
                        return;

                    case "sendMessage":
                        const mockAdminUser1 = { userId: "pm_admin_01", role: "admin" };
                        result = await handleSendMessage(data, mockAdminUser1);
                        res.status(200).json(result);
                        return;

                    // case "createAnnouncement":
                    //     requireAdmin(req, res, async () => {
                    //         result = await handleCreateAnnouncement(data, req.user);
                    //         res.status(200).json(result);
                    //     });
                    //     return;

                    // case "getAnnouncements":
                    //     requireAuth(req, res, async () => {
                    //         result = await handleGetAnnouncements();
                    //         res.status(200).json(result);
                    //     });
                    //     return;

                    case "createAnnouncement":
                        const mockAdminUser2 = { userId: "pm_admin_01", role: "admin" };
                        result = await handleCreateAnnouncement(data, mockAdminUser2);
                        res.status(200).json(result);
                        return;

                    case "getAnnouncements":
                        result = await handleGetAnnouncements();
                        res.status(200).json(result);
                        return;

                    default:
                        return res.status(400).json({ success: false, error: "Invalid request type" });
                }

                return res.status(200).json(result);

            } catch (error) {
                console.error(`Error for type: ${type}`, error);
                if (error instanceof functions.https.HttpsError) {
                    return res.status(403).json({ success: false, error: error.message });
                }
                return res.status(500).json({ success: false, error: "An internal server error occurred." });
            }
        });
    });
});