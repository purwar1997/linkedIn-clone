import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

const usersRef = collection(db, 'users');
const postsRef = collection(db, 'posts');

export const createUser = async (userId, name, email) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { name, email });
  }
};

export const getCurrentUser = async userId => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  const user = { id: docSnap.id, ...docSnap.data() };
  return user;
};

export const createPostAPI = async postData => {
  const docRef = await addDoc(postsRef, postData);

  if (!docRef?.id) {
    throw new Error('Failed to create post');
  }
};

export const getPostsAPI = async setPosts => {
  const q = query(postsRef, orderBy('createdBy', 'desc'));

  onSnapshot(q, querySnapshot => {
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(posts);
  });

  // const querySnapshot = await getDocs(postsRef);
  // const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // return posts;
};
