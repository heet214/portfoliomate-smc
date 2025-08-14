import { storage } from "../firebaseConfig"; // Assuming firebaseConfig is in src
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file to a specified path in Firebase Storage.
 * @param {File} file - The file to upload.
 * @param {string} path - The folder path in storage (e.g., 'profileImages').
 * @returns {Promise<string>} - The public download URL of the uploaded file.
 */
export async function uploadFileToStorage(file, path) {
    if (!file) throw new Error("No file provided for upload.");

    try {
        const timestamp = Date.now();
        const filePath = `${path}/${timestamp}_${file.name}`;
        const fileRef = ref(storage, filePath);

        // Metadata is useful but CORS settings here don't affect download access.
        // Storage access rules are the primary security mechanism.
        const metadata = {
            contentType: file.type,
        };

        const snapshot = await uploadBytes(fileRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        console.log('File uploaded successfully:', downloadURL);
        return downloadURL;

    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}
