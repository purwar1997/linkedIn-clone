import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { BsBriefcaseFill } from 'react-icons/bs';
import { MdMessage, MdNotifications } from 'react-icons/md';
import TopbarLogo from '../assets/topbarLogo.png';
import '../styles/Topbar.css';

export default function Topbar() {
  return (
    <div className='topbar'>
      <Link to='/'>
        <img className='topbar-logo' src={TopbarLogo} alt='topbar-logo' />
      </Link>

      {/* <form>
        <input type='search' name='search' placeholder='Search' />
      </form> */}

      <div className='react-icons'>
        <AiFillHome className='react-icon' />
        <HiUsers className='react-icon' />
        <BsBriefcaseFill className='react-icon' />
        <MdMessage className='react-icon' />
        <MdNotifications className='react-icon' />
      </div>
    </div>
  );
}
