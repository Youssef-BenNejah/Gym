'use client'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { username, password });
      Cookies.set('token', res.data.access_token);
      router.push('/dashboard');
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '100px auto' }}>
      <h2>Connexion Admin Gym</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
