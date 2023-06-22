import { storage, db } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const usersRef = ref(storage, 'users');

export const uploadFileAPI = async (userId, file) => {
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
    },
    err => toast.error(err.message),
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('User not found');
      }

      await updateDoc(docRef, {
        imageUrl: downloadURL,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    }
  );
};
