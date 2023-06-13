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

export default function Topbar() {
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

      <div className='react-icons'>
        <AiFillHome className='react-icon' />
        <HiUsers className='react-icon' />
        <BsBriefcaseFill className='react-icon' />
        <MdMessage className='react-icon' />
        <MdNotifications className='react-icon' />
        <FaUserCircle
          className='react-icon'
          onClick={() => (isPopupOpen ? closePopup() : openPopup())}
        />
      </div>

      {isPopupOpen && <ProfilePopup closePopup={closePopup} />}
    </div>
  );
}
