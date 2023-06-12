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

  const response = await createUserWithEmailAndPassword(auth, email, password);
  const user = response.user;
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

  const response = await signInWithEmailAndPassword(auth, email, password);
  const user = response.user;
  return user;
};

export const logoutAPI = async () => {
  await signOut();
};

export const googleSignInAPI = async () => {
  const provider = new GoogleAuthProvider();

  const response = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(response);
  const token = credential.accessToken;
  const user = response.user;

  return { user, token };
};
