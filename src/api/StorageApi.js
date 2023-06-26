import { storage, db } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { toast } from 'react-toastify';

const usersRef = ref(storage, 'users');

export const uploadImageAPI = async (userId, file, setProgress) => {
  const metadata = {
    name: file.name,
    size: file.size,
    contentType: file.type,
  };

  const storageRef = ref(usersRef, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    'state_changed',
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    err => toast.error(err.message),
    async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('User not found');
      }

      const user = { id: docSnap.id, ...docSnap.data() };

      if (user.profileImage && user.profileImage !== file.name) {
        const storageRef = ref(storage, `users/${user.profileImage}`);
        await deleteObject(storageRef);
      }

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await updateDoc(docRef, {
        profileImage: file.name,
        imageUrl: downloadURL,
      });
    }
  );
};

export const deleteImageAPI = async (userId, image) => {
  const storageRef = ref(storage, `users/${image}`);
  await deleteObject(storageRef);

  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('User not found');
  }

  const user = { id: docSnap.id, ...docSnap.data() };

  await updateDoc(docRef, {
    ...user,
    profileImage: deleteField(),
    imageUrl: deleteField(),
  });
};
