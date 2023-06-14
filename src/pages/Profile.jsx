import ProfileComponent from '../components/ProfileComponent';

export default function Profile({ currentUser, profileId }) {
  return <ProfileComponent currentUser={currentUser} profileId={profileId} />;
}
