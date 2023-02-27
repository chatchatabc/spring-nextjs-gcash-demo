'use client';

import { useEffect, useState } from 'react';

export default function Profile() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [authorities, setAuthorities] = useState<string | null>(null);

  useEffect(() => {
    // Get username from local storage
    setUsername(localStorage.getItem('username'));
    // Get email from local storage
    setEmail(localStorage.getItem('email'));
    // Get Roles from local storage
    setAuthorities(localStorage.getItem('authorities'));
  }, []);

  return (
    <div className='w-full px-8'>
      <h1 className='text-3xl font-semibold uppercase'>Profile</h1>
      <article className='py-8'>
        <h2 className='text-xl'>
          Username: <span className='font-semibold'>{username}</span>
        </h2>
        <h2 className='text-xl'>
          Email: <span className='font-semibold'>{email}</span>
        </h2>
        <h2 className='text-xl'>
          Role: <span className='font-semibold'>{authorities}</span>
        </h2>
      </article>
    </div>
  );
}
