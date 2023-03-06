'use client';

import CreateProduct from '@/app/admin/CreateProduct';
import ListProducts from '@/app/admin/ListProducts';
import { useState } from 'react';

export default function Admin() {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <div className='px-8'>
      <h1 className='text-3xl uppercase font-semibold'>Admin</h1>

      {/* Create Product Form */}
      <CreateProduct setUpdate={setUpdate} />

      {/* Product List */}
      <ListProducts update={update} setUpdate={setUpdate} />
    </div>
  );
}
