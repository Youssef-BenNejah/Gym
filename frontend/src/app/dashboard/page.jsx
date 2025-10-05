'use client'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) router.push('/login');
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>🏋️‍♂️ Tableau de bord Admin</h1>
      <p>Bienvenue, Ziyed !</p>
      <button onClick={() => { Cookies.remove('token'); router.push('/login'); }}>
        Déconnexion
      </button>
    </div>
  );
}
