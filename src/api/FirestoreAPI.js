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
  updateDoc,
} from 'firebase/firestore';

const usersRef = collection(db, 'users');
const postsRef = collection(db, 'posts');

export const createUserAPI = async (userId, name, email) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { name, email });
  }
};

export const updateUserAPI = async (userId, updates) => {
  const { name, headline, education, location, company } = updates;

  if (!(name && headline && education, location)) {
    throw new Error('Name, headline, education and location are mandatory to fill.');
  }

  if (!company) {
    delete updates.company;
  }

  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  await updateDoc(docRef, updates);
};

export const getCurrentUserAPI = async (userId, setCurrentUser) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  onSnapshot(docRef, doc => {
    const user = { id: doc.id, ...doc.data() };
    setCurrentUser(user);
  });
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
};
