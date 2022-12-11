import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'


// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
// }

const firebaseConfig = {
  apiKey: "AIzaSyDdJViAsg7kAO6kYdZRXljJXCEaGxIFzSw",
  authDomain: "scour-f396a.firebaseapp.com",
  projectId: "scour-f396a",
  storageBucket: "scour-f396a.appspot.com",
  messagingSenderId: "1069346067565",
  appId: "1:1069346067565:web:75c475f9675d70a66e9b64",
  measurementId: "G-4C7BFPXF8T"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const firestore = getFirestore(app)

const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);


export { app, auth, firestore, analytics }
