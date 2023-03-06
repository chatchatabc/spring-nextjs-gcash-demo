'use client';

import { FormResponse } from '@/lib/api/Interfaces';
import { loginUser } from '@/lib/api/User';
import Cookies from 'js-cookie';
import { FormEvent, useRef, useState } from 'react';

export default function Login() {
  // References
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // States
  const [status, setStatus] = useState<FormResponse>(FormResponse.IDLE);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(FormResponse.LOADING);
    const res = await loginUser({
      username: username.current?.value!,
      password: password.current?.value!,
    });

    // Succcessful login
    if (res.status === 200) {
      setStatus(FormResponse.SUCCESS);
      // Set token cookie
      Cookies.set('token', res.data.token);
      // Set Username Localstorage
      localStorage.setItem('username', res.data.username);
      // Set Email Localstorage
      localStorage.setItem('email', res.data.email);
      // Set Authorities
      localStorage.setItem('authorities', res.data.authorities[0].authority);
      // Redirect to home page
      window.location.href = '/';
      return;
    }
    // Failed login
    else if (res.status >= 300) {
      setStatus(FormResponse.ERROR);
      return;
    }
  };

  return (
    <form
      onSubmit={login}
      className='flex flex-col justify-center w-[30%] border border-gray-500 rounded-md mx-auto'
    >
      <div className='text-center pt-4'>
        <h1 className='uppercase text-2xl font-semibold'>Login</h1>
      </div>
      <div>
        {status === FormResponse.SUCCESS && (
          <p className='text-center text-green-500'>Login Successful!</p>
        )}
        {status === FormResponse.ERROR && (
          <p className='text-center text-red-500'>Invalid credentials!</p>
        )}
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='text'
          name='username'
          placeholder='Username'
          ref={username}
          required
        />
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='password'
          name='password'
          placeholder='Password'
          ref={password}
          required
        />
      </div>
      <div className='py-4 px-4'>
        <button
          type='submit'
          className='bg-blue-500 rounded-md py-2 px-4 text-white uppercase'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
