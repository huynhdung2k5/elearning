// ----------------------------------------------------------------------
// Danh sách thông báo
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// layouts
import MainLayout from '../../layouts/main';
// auth
import { useSettingsContext } from '../../components/settings';
// component
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// router
import { PATH_ROOTS } from '../../routes/paths';
// sections
import NotificationsTable from '../../sections/app/notifications/NotificationsTable';
// firebase
import { useGetDocument } from '../../lib/firebase/service';

// ----------------------------------------------------------------------

ListPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ListPage() {
  const notifications = useGetDocument('notifications'); // lấy dữ liệu từ slice redux

  const { themeStretch } = useSettingsContext(); // theme setting

  return (
    <>
      <Head>
        <title>Thông báo</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Thông báo"
          links={[
            { name: 'Quản lý', href: PATH_ROOTS.root },
            {
              name: 'Thông báo',
              href: PATH_ROOTS.app.notifications,
            },
            { name: 'Danh sách' },
          ]}
        />

        <NotificationsTable products={notifications} />
      </Container>
    </>
  );
}
