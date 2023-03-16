// ----------------------------------------------------------------------
// Trang quyền truy cập
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
import NextLink from 'next/link';
// react
// @mui
import { Button, Container } from '@mui/material';
// layouts
import MainLayout from '../../../layouts/main';
// auth
import { useSettingsContext } from '../../../components/settings';
// component
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
// router
import { PATH_ROOTS } from '../../../routes/paths';
// sections
import { PermissionTable } from '../../../sections/settings/permission';
// utils
import { permissions } from '../../../utils/mockData';

// ----------------------------------------------------------------------

ListPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ListPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const options = ['Quản lý', 'Giáo viên', 'Học sinh'];

  return (
    <>
      <Head>
        <title>Danh sách vai trò</title>
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
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_ROOTS.permission.create}
              color="info"
              variant="contained"
              startIcon={<Iconify icon="fluent-mdl2:permissions-solid" />}
            >
              THÊM QUYỀN MỚI
            </Button>
          }
        />

        <PermissionTable products={permissions} options={options} />
      </Container>
    </>
  );
}
