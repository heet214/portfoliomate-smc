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

admin.initializeApp();
const db = admin.firestore();

const JWT_SECRET = "DEFAULT_FALLBACK_SECRET_KEY_FOR_LOCAL_DEV";
// const JWT_SECRET = functions.config().jwt.secret || "DEFAULT_FALLBACK_SECRET_KEY_FOR_LOCAL_DEV";

// --- AUTHENTICATION LOGIC (No changes here) ---

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
    const token = jwt.sign({ userId: userProfile.userId, roles: userProfile.roles }, JWT_SECRET, { expiresIn: '7d' });
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