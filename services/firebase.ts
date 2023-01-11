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
  apiKey: "AIzaSyAGj0K04JTIVAw7XMatUvAS31LINMmxa7Y",
  authDomain: "scour-test.firebaseapp.com",
  projectId: "scour-test",
  storageBucket: "scour-test.appspot.com",
  messagingSenderId: "131503368289",
  appId: "1:131503368289:web:8b0786663ad9ea8d8ce220"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const firestore = getFirestore(app)

const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);


export { app, auth, firestore, analytics }
