import UserFeed from './UserFeed/index';

export default function HomeComponent({ currentUser }) {
  return (
    <div className='home-component'>
      <UserFeed currentUser={currentUser} />
    </div>
  );
}
