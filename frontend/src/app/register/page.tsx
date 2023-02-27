'use client';

import axios from 'axios';
import { useRef } from 'react';

export default function Register() {
  const form = useRef<HTMLFormElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const register = async () => {
    // Using axios create a post request to /api/register
    // with the username and password from the form
    // If successful, redirect to /login
    // If not, display the error message
    const res = await axios.post('/api/register', {
      username: username.current?.value,
      password: password.current?.value,
    });
  };
  return (
    <form className='flex flex-col justify-center w-[30%] border border-gray-500 rounded-md mx-auto'>
      <div className='text-center pt-4'>
        <h1 className='uppercase text-2xl font-semibold'>Register</h1>
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
