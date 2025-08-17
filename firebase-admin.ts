import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"; 

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceKey = {
  apiKey: "AIzaSyAuhWgdlJXNWRqw9JpDeHi6OfvbGGRLcns",
  authDomain: "notely-608b0.firebaseapp.com",
  projectId: "notely-608b0",
  storageBucket: "notely-608b0.firebasestorage.app",
  messagingSenderId: "958367213264",
  appId: "1:958367213264:web:f571285cf6752a226a20d5"
};

let app: App;
if (getApps().length === 0) {
app = initializeApp({ 
     credential: cert(serviceKey),
});
} else {  
app = getApp();
}
const adminDb = getFirestore(app);
export { app as adminApp, adminDb };