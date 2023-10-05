import firebase from "firebase/compat/app";

// import firebase libraries being used in the project here
// use the /compat (namespaced API) version of imports here
// list of available libraries: 
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/auth";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // optional
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);

export default FirebaseApp;
