import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'linkedin-clone-9532f.firebaseapp.com',
  projectId: 'linkedin-clone-9532f',
  storageBucket: 'linkedin-clone-9532f.appspot.com',
  messagingSenderId: '809911467700',
  appId: '1:809911467700:web:73641556cef2074a5561e1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
