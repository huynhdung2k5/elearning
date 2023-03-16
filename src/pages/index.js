// ----------------------------------------------------------------------
// Trang index
// ----------------------------------------------------------------------
// react
import { useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
// layouts
import MainLayout from '../layouts/main';
// route
import { PATH_ROOTS } from '../routes/paths';
// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const { pathname, replace } = useRouter(); // router

  useEffect(() => {
    if (pathname === PATH_ROOTS.root) {
      replace(PATH_ROOTS.general.overview);
    }
  }, [pathname]); // chuyển đến trang order
  return (
    <>
      <Head>
        <title>Phần mềm học trực tuyến</title>
      </Head>
    </>
  );
}
