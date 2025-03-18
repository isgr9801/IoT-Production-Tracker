import admin from "firebase-admin";

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in environment variables.");
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error) {
  throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format. Check your .env file.");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyIdToken = async (idToken: string) => {
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    throw new Error("Invalid authentication token");
  }
};