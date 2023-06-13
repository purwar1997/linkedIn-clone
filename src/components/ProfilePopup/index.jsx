import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAPI } from '../../api/AuthApi';
import './index.css';

export default function ProfilePopup() {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logoutAPI();
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  //   const closePopupWindow = event => {
  //     if (event.target !== event.currentTarget) {
  //       closePopup();
  //     }
  //   };

  //   document.addEventListener('keydown', event => {
  //     if (event.key === 'Escape') {
  //       closePopup();
  //     }
  //   });

  return (
    <div className='popup-card'>
      <ul className='popup-options'>
        <li className='popup-option' onClick={signOut}>
          Sign Out
        </li>
      </ul>
    </div>
  );
}
