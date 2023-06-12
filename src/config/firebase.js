import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'linkedin-clone-4f560.firebaseapp.com',
  projectId: 'linkedin-clone-4f560',
  storageBucket: 'linkedin-clone-4f560.appspot.com',
  messagingSenderId: '120905914591',
  appId: '1:120905914591:web:62af6ed6f5a015fdb6b16a',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
