import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

// Initialize Firestore
const db = admin.firestore();

// Initialize Firebase Cloud Messaging
const messaging = admin.messaging();

export { admin, db, messaging }; 