import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function HomeLayout() {
  return (
    <section>
      <Topbar />
      <Outlet />
    </section>
  );
}
