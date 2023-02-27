import CreateProduct from '@/components/forms/CreateProduct';

export default function Admin() {
  return (
    <div className='px-8'>
      <h1 className='text-3xl uppercase font-semibold'>Admin</h1>

      {/* Create Product Form */}
      <CreateProduct />
    </div>
  );
}
