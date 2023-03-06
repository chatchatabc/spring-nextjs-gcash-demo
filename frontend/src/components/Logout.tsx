'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

export default function Logout(params: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const logout = () => {
    // Clear token cookie
    Cookies.remove('token');
    // Clear Username Localstorage
    localStorage.removeItem('username');
    // Clear Email Localstorage
    localStorage.removeItem('email');
    // Clear Authorities
    localStorage.removeItem('authorities');

    // Set isLoggedIn to false
    params.setIsLoggedIn(false);

    // Redirect to login
    router.push('/login');
  };
  return (
    <button type='button' onClick={logout}>
      Logout
    </button>
  );
}
