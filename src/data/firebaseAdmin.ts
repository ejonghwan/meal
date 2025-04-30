import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
   });
}

const adminDB = admin.firestore();

export { admin, adminDB };