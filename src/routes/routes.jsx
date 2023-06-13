import { Fragment } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Authenticate from '../components/Autheticate';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route
        path='/'
        element={
          <Authenticate>
            <HomeLayout />
          </Authenticate>
        }
      >
        <Route index element={<Home />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Fragment>
  )
);

export default router;
