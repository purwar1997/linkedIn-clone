import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar/index';

export default function HomeLayout() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
}
