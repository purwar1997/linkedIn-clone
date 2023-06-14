import UserFeed from './UserFeed/index';
import '../styles/HomeComponent.css';

export default function HomeComponent({ currentUser }) {
  return (
    <div className='home-component'>
      <UserFeed currentUser={currentUser} />
    </div>
  );
}
