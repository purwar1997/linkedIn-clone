import ProfileFeed from './ProfileFeed/index';
// import '../styles/ProfileComponent.css';

export default function ProfileComponent({ currentUser, profileId }) {
  return (
    <div className='profile-component'>
      <ProfileFeed currentUser={currentUser} profileId={profileId} />
    </div>
  );
}
