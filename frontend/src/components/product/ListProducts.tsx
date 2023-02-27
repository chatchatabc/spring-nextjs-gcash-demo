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
            className='my-4 border border-gray-500 rounded-md p-8 mx-8'
          >
            <div className='grid grid-cols-2'>
              <img src={product.imageUrl} alt={product.name} />
              <div>
                <h1 className='text-xl font-semibold'>Name: {product.name}</h1>
                <p className='text-sm'>Description: {product.description}</p>
                <p className='text-sm'>Price: {product.price}</p>
                <p className='text-sm'>Quantity: {product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
