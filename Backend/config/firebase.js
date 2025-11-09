import admin from 'firebase-admin';
// import dotenv from 'dotenv';
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'serviceAccount.json'), 'utf8')
)
const adminDetails = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // credential: admin.credential.cert(
    // {
    //     projectId: process.env.FIREBASE_PROJECT_ID,
    //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    // })
})

export default adminDetails  