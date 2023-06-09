import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </>
  )
);

export default router;
