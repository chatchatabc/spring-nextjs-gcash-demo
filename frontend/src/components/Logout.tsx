'use client';

export default function Logout() {
  const logout = () => {
    console.log('logout');
  };
  return (
    <button type='button' onClick={logout}>
      Logout
    </button>
  );
}
