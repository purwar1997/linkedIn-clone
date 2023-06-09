import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAPI, googleSignInAPI } from '../api/authentication';
import { toast } from 'react-toastify';
import LinkedInLogo from '../assets/linkedInLogo.png';
import googleIcon from '../assets/googleIcon.png';
import '../styles/LoginComponent.css';

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function login(event) {
    event.preventDefault();

    try {
      await loginAPI(credentials);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function signInWithGoogle() {
    try {
      await googleSignInAPI();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <section className='login-wrapper'>
      <Link to='/'>
        <img className='site-logo' src={LinkedInLogo} alt='linkedin-logo' />
      </Link>

      <div className='login-container'>
        <h1 className='heading'>Sign in</h1>
        <p className='sub-heading'>Stay updated on your professional world</p>

        <form className='login-form' onSubmit={login}>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            value={credentials.email}
            onChange={handleChange}
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={credentials.password}
            onChange={handleChange}
          />

          <button type='submit' className='login-btn'>
            Sign in
          </button>
        </form>

        <p className='or-divider'>or</p>

        <button className='google-btn' onClick={signInWithGoogle}>
          <img src={googleIcon} alt='google-icon' />
          <span>Continue with Google</span>
        </button>

        <p className='join-now'>
          New to Linkedin? <Link to='/signup'>Join now</Link>
        </p>
      </div>
    </section>
  );
}
