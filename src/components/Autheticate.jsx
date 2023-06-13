import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import Loader from './Loader/index';

export default function Authenticate({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user?.accessToken) {
        navigate('login');
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : children;
}
