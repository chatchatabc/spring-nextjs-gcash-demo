'use client';

import Link from 'next/link';
import Logout from './Logout';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Navbar() {
  // States
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [authorities, setAuthorities] = useState<string | null>(null);
  // Check if token cookie exists
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Get username from local storage
    setUsername(localStorage.getItem('username'));
    // Get email from local storage
    setEmail(localStorage.getItem('email'));
    // Get Roles from local storage
    setAuthorities(localStorage.getItem('authorities'));
    setIsLoggedIn(!!Cookies.get('token'));
  }, []);

  return (
    <nav className='flex flex-wrap items-center justify-between mx-auto py-4 px-8 border border-b-4 shadow-sm mb-6'>
      <div>
        <Link href={'/'}>
          <h1>Spring Next.js Gcash Demo</h1>
        </Link>
      </div>
      <div>
        <ul className='flex'>
          <li className='pl-4'>
            <Link href='/'>Home</Link>
          </li>

          {/* Show only if user is not logged in */}
          {!isLoggedIn && (
            <>
              <li className='pl-4'>
                <Link href='/login'>Login</Link>
              </li>
              <li className='pl-4'>
                <Link href='/register'>Register</Link>
              </li>
            </>
          )}
          {/* Show only if user is an admin */}
          {isLoggedIn && authorities === 'ROLE_ADMIN' && (
            <li className='pl-4'>
              <Link href='/admin'>Admin</Link>
            </li>
          )}

          {/* Show only if user is logged in */}
          {isLoggedIn && (
            <>
              <li className='pl-4'>
                <Link href='/profile'>Profile</Link>
              </li>
              <li className='pl-4'>
                <Logout setIsLoggedIn={setIsLoggedIn} />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
