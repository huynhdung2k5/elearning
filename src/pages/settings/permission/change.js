// ----------------------------------------------------------------------
// Trang đổi quyền truy cập
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
import { ChangePermissionTable } from '../../../sections/settings/permission';
// utils
import { permissions } from '../../../utils/mockData';

// ----------------------------------------------------------------------

ChangePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ChangePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const options = ['Quản lý', 'Giáo viên', 'Học sinh'];

  return (
    <>
      <Head>
        <title>Cấp vai trò cho người dùng</title>
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
            { name: 'Cấp vai trò' },
          ]}
        />

        <ChangePermissionTable products={permissions} options={options} />
      </Container>
    </>
  );
}
