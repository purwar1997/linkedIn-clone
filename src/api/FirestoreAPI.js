import { auth, db } from '../config/firebase';
import { collection, addDoc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';

const postsRef = collection(db, 'posts');

export const createPostAPI = async post => {
  const docRef = await addDoc(postsRef, {
    content: post,
    userId: auth.currentUser.uid,
    createdAt: Timestamp.fromDate(new Date()),
  });

  if (!docRef?.id) {
    throw new Error('Failed to create post');
  }
};

export const getPostsAPI = async () => {
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return posts;
};
