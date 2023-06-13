import { useOutletContext } from 'react-router-dom';
import { currentUserContext } from '../context';
import HomeComponent from '../components/HomeComponent';

export default function Home() {
  const currentUser = useOutletContext();

  return (
    <currentUserContext.Provider value={currentUser}>
      <HomeComponent />
    </currentUserContext.Provider>
  );
}
