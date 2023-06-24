import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAPI } from '../../api/AuthApi';
import './index.css';

export default function ProfilePopup({ currentUser, closePopup }) {
  const navigate = useNavigate();

  const viewProfile = () => {
    navigate(`/profile/${currentUser.id}`);
    closePopup();
  };

  const signOut = async () => {
    try {
      await logoutAPI();
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(currentUser);

  return (
    <div className='popup-card'>
      <p className='name'>{currentUser.name}</p>
      <p className='bio'>{currentUser.headline}</p>
      <div className='popup-card-btns'>
        <button onClick={viewProfile}>View Profile</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
