'use client';

import { IProduct } from '@/lib/api/Interfaces';
import { getProducts } from '@/lib/api/Product';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function ListProducts(params: {
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProductsAPI = async () => {
      const res = await getProducts();
      console.log(res);
      setProducts(res.data.content);
      params.setUpdate(false);
    };
    getProductsAPI();
  }, [params.update]);

  return (
    <div className=''>
      <h1 className='text-2xl uppercase font-semibold text-center'>Products</h1>
      <div className='grid grid-cols-2 w-full mx-auto'>
        {products.map((product) => (
          <div
            key={`product_${product.id}`}
            className='my-4 h-64 border flex border-gray-500 rounded-3xl overflow-hidden mx-8'
          >
            <div className='flex-1 h-full'>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex-1 p-4'>
              <h1 className='text-xl font-semibold'>Name: {product.name}</h1>
              <p className='text-sm'>Description: {product.description}</p>
              <p className='text-sm'>Price: {product.price}</p>
              <p className='text-sm'>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
