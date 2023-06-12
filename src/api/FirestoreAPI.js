import { auth, db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const postsRef = collection(db, 'posts');

export const createPostAPI = async post => {
  console.log(post);
  console.log(auth.currentUser);
};
