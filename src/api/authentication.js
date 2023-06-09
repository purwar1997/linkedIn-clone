import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const signup = async credentials => {
  const { email, password } = credentials;

  if (!email) {
    throw new Error('Please enter an email address');
  }

  if (!password) {
    throw new Error('Please enter a password');
  }

  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  return user;
};

export const login = async credentials => {
  const { email, password } = credentials;

  if (!email) {
    throw new Error('Please enter an email address');
  }

  if (!password) {
    throw new Error('Please enter a password');
  }

  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = res.user;
  return user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;

  return { user, token };
};
