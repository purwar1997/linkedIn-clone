import ProfileCard from './ProfileCard/index';
import '../styles/ProfileComponent.css';

export default function ProfileComponent({ currentUser }) {
  return (
    <div className='profile-component'>
      <ProfileCard currentUser={currentUser} />
    </div>
  );
}
