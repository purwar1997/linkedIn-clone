import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const usersRef = collection(db, 'users');
const postsRef = collection(db, 'posts');
const commentsRef = collection(db, 'comments');

// User collection
export const createUserAPI = async (userId, name, email) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { name, email });
  }
};

export const getUsersAPI = async setUsers => {
  onSnapshot(usersRef, snapshot => {
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(users);
  });
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

export const getProfileAPI = async (profileId, setProfile) => {
  const docRef = doc(db, 'users', profileId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Profile not found');
  }

  onSnapshot(docRef, doc => {
    const profile = { id: doc.id, ...doc.data() };
    setProfile(profile);
  });
};

export const updateProfileAPI = async (userId, updates) => {
  for (const [key, value] of Object.entries(updates)) {
    if (!value) {
      delete updates[key];
    }
  }

  const { name, headline, education, location, phoneNo } = updates;

  if (!(name && headline && education, location && phoneNo)) {
    throw new Error('Fields marked with * are mandatory.');
  }

  if (updates.skills) {
    updates.skills = updates.skills.split(', ');
  }

  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  await updateDoc(docRef, updates);
};

export const saveOrUnsavePostAPI = async (userId, postId, action) => {
  let docRef = doc(db, 'posts', postId);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Post not found');
  }

  docRef = doc(db, 'users', userId);
  docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  const user = { id: docSnap.id, ...docSnap.data() };

  switch (action) {
    case 'save': {
      if (user.savedPosts?.includes(postId)) {
        throw new Error('You have already saved this post');
      }

      user.savedPosts = user.savedPosts ? [...user.savedPosts, postId] : [postId];
      break;
    }

    case 'unsave': {
      if (!user.savedPosts.includes(postId)) {
        throw new Error('You have already unsaved this post');
      }

      user.savedPosts = user.savedPosts.filter(savedPostId => savedPostId !== postId);
      break;
    }
  }

  await updateDoc(docRef, {
    ...user,
    updatedAt: new Date(),
  });
};

// Posts collection
export const createPostAPI = async postData => {
  const docRef = await addDoc(postsRef, postData);

  if (!docRef?.id) {
    throw new Error('Failed to create post');
  }
};

export const getPostsAPI = async setPosts => {
  const q = query(postsRef, orderBy('createdAt', 'desc'));

  onSnapshot(q, querySnapshot => {
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(posts);
  });
};

export const editPostAPI = async (postId, updates) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Post not found');
  }

  await updateDoc(docRef, updates);
};

export const deletePostAPI = async postId => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Post not found');
  }

  await deleteDoc(docRef);
};

export const manageLikesAPI = async (postId, userId, action) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Post not found');
  }

  const post = { id: docSnap.id, ...docSnap.data() };

  switch (action) {
    case 'like': {
      if (post.likedBy?.includes(userId)) {
        throw new Error('You have already liked this post');
      }

      post.likedBy = post.likedBy ? [...post.likedBy, userId] : [userId];
      break;
    }

    case 'unlike': {
      if (!post.likedBy.includes(userId)) {
        throw new Error('You have already unliked this post');
      }

      post.likedBy = post.likedBy.filter(likedUserId => likedUserId !== userId);
      break;
    }
  }

  await updateDoc(docRef, post);
};

// Comments collection
export const getCommentsAPI = async (postId, setComments) => {
  const q = query(commentsRef, where('postId', '==', postId));

  onSnapshot(q, querySnapshot => {
    const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setComments(comments);
  });
};

export const addCommentAPI = async commentInfo => {
  let docRef = await addDoc(commentsRef, commentInfo);

  if (!docRef?.id) {
    throw new Error('Failed to add comment');
  }
};

export const editCommentAPI = async (commentId, updates) => {
  const docRef = doc(db, 'comments', commentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Comment not found');
  }

  await updateDoc(docRef, updates);
};

export const deleteCommentAPI = async commentId => {
  const docRef = doc(db, 'comments', commentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Comment not found');
  }

  await deleteDoc(docRef);
};
