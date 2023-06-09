import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const signupAPI = async credentials => {
  const { email, password } = credentials;

  if (!email) {
    throw new Error('Please enter an email address');
  }

  if (!password) {
    throw new Error('Please enter a password');
  }

  if (password.length < 6) {
    throw new Error('Password must be atleast 6 characters long');
  }

  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  return user;
};

export const loginAPI = async credentials => {
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

export const logoutAPI = async () => {
  await signOut();
};

export const googleSignInAPI = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;

  return { user, token };
};
