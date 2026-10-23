import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDj_UYfBQe_3BHHmMPQjmIGNCwNQCF-RCI",
  authDomain: "naturalhealer.firebaseapp.com",
  projectId: "naturalhealer",
  storageBucket: "naturalhealer.firebasestorage.app",
  messagingSenderId: "460992322219",
  appId: "1:460992322219:web:5d394f5d3aed0bb9a535ee",
  measurementId: "G-KN0LEQ60D1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
