import { useState } from 'react';
import { login } from '../api/authentication';
import '../styles/LoginComponent.css';

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    await login(credentials.email, credentials.password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        placeholder='Email address'
        value={credentials.email}
        onChange={event => setCredentials({ ...credentials, email: event.target.value })}
      />

      <input
        type='password'
        name='password'
        placeholder='Password'
        value={credentials.password}
        onChange={event => setCredentials({ ...credentials, password: event.target.value })}
      />

      <button type='submit' className='login-btn'>
        Login
      </button>
    </form>
  );
}
