import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { BsBriefcaseFill } from 'react-icons/bs';
import { MdMessage, MdNotifications } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePopup from '../ProfilePopup';
import TopbarLogo from '../../assets/topbarLogo.png';
import './index.css';

export default function Topbar({ currentUser }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className='topbar'>
      <Link to='/'>
        <img className='topbar-logo' src={TopbarLogo} alt='topbar-logo' />
      </Link>

      <form className='search-form'>
        <input type='search' name='search' placeholder='Search' />
        <AiOutlineSearch className='search-icon' />
      </form>

      <div className='topbar-icons'>
        <Link to='/'>
          <AiFillHome className='topbar-icon' />
        </Link>
        <HiUsers className='topbar-icon' />
        <BsBriefcaseFill className='topbar-icon' />
        <MdMessage className='topbar-icon' />
        <MdNotifications className='topbar-icon' />
        <img
          src={currentUser.imageUrl}
          className='profile-icon'
          onClick={() => (isPopupOpen ? closePopup() : openPopup())}
        />
      </div>

      {isPopupOpen && <ProfilePopup currentUser={currentUser} closePopup={closePopup} />}
    </div>
  );
}
