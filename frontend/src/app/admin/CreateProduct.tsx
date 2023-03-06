'use client';

import { FormResponse } from '@/lib/api/Interfaces';
import { createProduct } from '@/lib/api/Product';
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

export default function CreateProduct(params: {
  setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  // States
  const [status, setStatus] = useState<FormResponse>(FormResponse.IDLE);

  // Refs
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const imageUrl = useRef<HTMLInputElement>(null);

  const createProductAPI = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(FormResponse.LOADING);

    const res = await createProduct({
      name: name.current?.value!,
      description: description.current?.value!,
      price: parseFloat(price.current?.value!),
      quantity: parseInt(quantity.current?.value!),
      imageUrl: imageUrl.current?.value!,
    });

    params.setUpdate(true);
  };

  return (
    <form
      onSubmit={createProductAPI}
      className='my-8 flex flex-col justify-center w-[30%] border border-gray-500 rounded-md mx-auto'
    >
      <div className='text-center pt-4'>
        <h1 className='text-2xl font-semibold'>Create Product</h1>
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
          name='name'
          placeholder='Name'
          ref={name}
          required
        />
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='text'
          name='description'
          placeholder='Product Description'
          ref={description}
          required
        />
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='number'
          name='price'
          placeholder='Price'
          ref={price}
          required
        />
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='number'
          name='quantity'
          placeholder='Quantity'
          ref={quantity}
          required
        />
      </div>
      <div className='pt-4 w-full px-4'>
        <input
          className='border border-gray-500 rounded-md py-2 px-2 w-full'
          type='text'
          name='imageUrl'
          placeholder='Image Url'
          ref={imageUrl}
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
