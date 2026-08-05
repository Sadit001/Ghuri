// Lazy initialization — Firebase Admin only starts when the first request arrives.
// This prevents crashes when Vite loads this file during config setup.

let initialized = false;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const loadAdmin = () => require('firebase-admin');

function ensureInitialized() {
  if (initialized) return;
  const admin = loadAdmin();
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Fixes the escaped \n characters in the .env private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log("🔥 Backend Firebase Admin Initialized Successfully!");
  }
  initialized = true;
}

/** Get the Firestore database instance */
export function getDb() {
  ensureInitialized();
  return loadAdmin().firestore();
}

/** Get the Firebase Auth admin instance */
export function getAdminAuth() {
  ensureInitialized();
  return loadAdmin().auth();
}

