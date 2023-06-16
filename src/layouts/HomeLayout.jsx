import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import { getCurrentUserAPI } from '../api/FirestoreApi';
import Topbar from '../components/Topbar/index';
import Home from '../pages/Home';

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await getCurrentUserAPI(auth.currentUser.uid, setCurrentUser);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getLoggedInUser();
  }, []);

  if (!currentUser) {
    return;
  }

  return (
    <>
      <Topbar currentUser={currentUser} />
      <Home currentUser={currentUser} />
    </>
  );
}
