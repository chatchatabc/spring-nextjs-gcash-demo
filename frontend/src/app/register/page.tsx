'use client';

import { FormResponse } from '@/lib/api/Interfaces';
import { registerUser } from '@/lib/api/User';
import { FormEvent, useRef, useState } from 'react';

export default function Register() {
  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // States
  const [status, setStatus] = useState<FormResponse>(FormResponse.IDLE);

  /**
   * Register a new user
   * @param e
   * @returns
   */
  const register = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(FormResponse.LOADING);
    const res = await registerUser({
      email: email.current?.value!,
      username: username.current?.value!,
      password: password.current?.value!,
    });

    // Successful registration
    if (res.status === 201) {
      setStatus(FormResponse.SUCCESS);
      return;
    }
    // Failed registration
    else if (res.status >= 300) {
      setStatus(FormResponse.ERROR);
      return;
    }
  };

  return (
    <form
      onSubmit={register}
      className='flex flex-col justify-center w-[30%] border border-gray-500 rounded-md mx-auto'
    >
      <div className='text-center pt-4'>
        <h1 className='uppercase text-2xl font-semibold'>Register</h1>
      </div>
      <div>
        {status === FormResponse.SUCCESS && (
          <p className='text-center text-green-500'>Registration Successful!</p>
        )}
        {status === FormResponse.ERROR && (
          <p className='text-center text-red-500'>Registration Failed!</p>
        )}
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='email'
          name='email'
          placeholder='Email'
          ref={email}
          required
        />
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
