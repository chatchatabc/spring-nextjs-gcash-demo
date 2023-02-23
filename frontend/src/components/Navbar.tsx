import Link from 'next/link';
import Logout from './Logout';

export default function Navbar() {
  return (
    <nav className='flex flex-wrap items-center justify-between mx-auto py-4 px-8 border border-b-4 shadow-sm mb-6'>
      <div>
        <Link href={'/'}>
          <h1>Spring Next.js Gcash Demo</h1>
        </Link>
      </div>
      <div>
        <ul className='flex'>
          <li className='pl-4'>
            <Link href='/'>Home</Link>
          </li>
          {/* TODO: Show only if user is not logged in */}
          <li className='pl-4'>
            <Link href='/login'>Login</Link>
          </li>
          <li className='pl-4'>
            <Link href='/register'>Register</Link>
          </li>
          {/* TODO: Show only if user is an admin */}
          <li className='pl-4'>
            <Link href='/admin'>Admin</Link>
          </li>
          {/* TODO: Show only if user is logged in */}
          <li className='pl-4'>
            <Link href='/profile'>Profile</Link>
          </li>
          <li className='pl-4'>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
}
