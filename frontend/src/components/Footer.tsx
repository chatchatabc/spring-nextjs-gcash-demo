import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t-4 border-b-0 shadow-t-sm mt-8 pt-4 px-8 text-center'>
      <Link className='text-sm' href={'/'}>
        Spring Next.js Gcash Demo
      </Link>
      <p className='font-light text-sm'>
        &#169;{' '}
        <Link href={'https://github.com/Raphile14'} target='_blank'>
          Raphael Dalangin 2023
        </Link>
      </p>
    </footer>
  );
}
