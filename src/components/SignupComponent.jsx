import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupAPI, googleSignInAPI } from '../api/AuthAPI';
import LinkedInLogo from '../assets/linkedInLogo.png';
import googleIcon from '../assets/googleIcon.png';
import '../styles/SignupComponent.css';

export default function SignupComponent() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const signup = async event => {
    event.preventDefault();

    try {
      await signupAPI(credentials);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignInAPI();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className='signup-wrapper'>
      <Link to='/'>
        <img className='site-logo' src={LinkedInLogo} alt='linkedin-logo' />
      </Link>

      <h1 className='heading'>Make the most of your professional life</h1>

      <div className='signup-container'>
        <form className='signup-form' onSubmit={signup}>
          <div className='signup-inputs'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              name='email'
              id='email'
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className='signup-inputs'>
            <label htmlFor='password'>Password (6 or more characters)</label>
            <input
              type='password'
              name='password'
              id='password'
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='signup-btn'>
            Sign up
          </button>
        </form>

        <p className='or-divider'>or</p>

        <button className='google-btn' onClick={signInWithGoogle}>
          <img src={googleIcon} alt='google-icon' />
          <span>Continue with Google</span>
        </button>

        <p className='sign-in'>
          Already on LinkedIn? <Link to='/'>Sign in</Link>
        </p>
      </div>
    </section>
  );
}