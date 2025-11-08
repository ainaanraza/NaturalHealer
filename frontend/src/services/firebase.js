import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDj_UYfBQe_3BHHmMPQjmIGNCwNQCF-RCI",
  authDomain: "naturalhealer.firebaseapp.com",
  projectId: "naturalhealer",
  storageBucket: "naturalhealer.firebasestorage.app",
  messagingSenderId: "460992322219",
  appId: "1:460992322219:web:5d394f5d3aed0bb9a535ee",
  measurementId: "G-KN0LEQ60D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
