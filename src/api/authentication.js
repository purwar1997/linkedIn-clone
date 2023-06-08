import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signup = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    // return response.user;
    console.log(response);
  } catch (err) {
    return err;
  }
};
