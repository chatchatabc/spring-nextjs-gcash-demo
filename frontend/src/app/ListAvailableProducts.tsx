'use client';

import { IProduct } from '@/lib/api/Interfaces';
import { getAvailableProducts } from '@/lib/api/Product';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListAvailableProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<any>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const getProductsAPI = async () => {
      // Get page from query
      let currPage = searchParams.get('page') || 0;
      let size = searchParams.get('size') || 10;

      const res = await getAvailableProducts({ page: currPage, size });
      setProducts(res.data.content);
      const { content, ...page } = res.data;
      setPage(page);
    };
    getProductsAPI();
  }, [searchParams]);

  return (
    <div>
      <h1 className='text-3xl font-semibold'>
        Products for Sale (Total: {page ? page.totalElements : '0'})
      </h1>

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
              <p className='text-sm'>Price: Php {product.price}</p>
              <p className='text-sm'>
                Quantity:{' '}
                {product.quantity > 0 ? product.quantity : 'Out of Stock'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-between py-8'>
        <Link
          aria-disabled={page.first}
          href={
            page.first
              ? { pathname: '/admin', query: { page: page.number } }
              : { pathname: '/admin', query: { page: page.number - 1 } }
          }
          className={`${
            page.first ? 'bg-gray-500' : 'bg-blue-500'
          } rounded-md py-2 px-4 text-white uppercase`}
        >
          Previous
        </Link>
        {page && <div>Page: {page.number + 1}</div>}
        <Link
          aria-disabled={page.last}
          href={
            page.last
              ? { pathname: '/admin', query: { page: page.number } }
              : { pathname: '/admin', query: { page: page.number + 1 } }
          }
          className={`${
            page.last ? 'bg-gray-500' : 'bg-blue-500'
          } rounded-md py-2 px-4 text-white uppercase`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
