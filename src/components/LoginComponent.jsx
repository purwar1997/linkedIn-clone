import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login, signInWithGoogle } from '../api/authentication';
import LinkedInLogo from '../assets/linkedInLogo.png';
import googleIcon from '../assets/googleIcon.png';
import '../styles/LoginComponent.css';
import { auth } from '../config/firebase';

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await login(credentials);
    } catch (error) {
      setError(error);
    }
  }

  async function handleClick() {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err);
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

        <form className='login-form' onSubmit={handleSubmit}>
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

        <button className='google-btn' onClick={handleClick}>
          <img src={googleIcon} alt='google-icon' />
          <span>Continue with Google</span>
        </button>
      </div>
    </section>
  );
}
