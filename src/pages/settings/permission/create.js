// ----------------------------------------------------------------------
// Trang thêm data
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// layouts
import MainLayout from '../../../layouts/main';
// auth
import { useSettingsContext } from '../../../components/settings';
// component
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// router
import { PATH_ROOTS } from '../../../routes/paths';
// sections
import { PermissionForm } from '../../../sections/settings/permission';

// ----------------------------------------------------------------------

CreatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function CreatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  return (
    <>
      <Head>
        <title>Tạo vai trò mới</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Vai trò"
          links={[
            { name: 'Cài đặt', href: PATH_ROOTS.root },
            {
              name: 'Vai trò',
              href: PATH_ROOTS.permission.list,
            },
            { name: 'Tạo mới' },
          ]}
        />

        <PermissionForm />
      </Container>
    </>
  );
}
