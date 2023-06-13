import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import { getCurrentUser } from '../api/FirestoreApi';
import Topbar from '../components/Topbar/index';

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const loggedInUser = await getCurrentUser(auth.currentUser.uid);
        setCurrentUser(loggedInUser);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getLoggedInUser();
  }, []);

  return (
    <>
      <Topbar currentUser={currentUser} />
      <Outlet context={currentUser} />
    </>
  );
}
