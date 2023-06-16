import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAPI } from '../../api/AuthApi';
import './index.css';

export default function ProfilePopup({ currentUser }) {
  const navigate = useNavigate();

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
      <div className='btn-group'>
        <button className='popup-btn' onClick={() => navigate(`/profile/${currentUser.id}`)}>
          View Profile
        </button>
        <button className='popup-btn' onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
