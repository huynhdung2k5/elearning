// ----------------------------------------------------------------------
// Trang đăng nhập
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// auth
import GuestGuard from '../../auth/GuestGuard';
// section
import Login from '../../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Đăng nhập GD Việt Nam</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
