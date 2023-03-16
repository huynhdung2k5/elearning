// ----------------------------------------------------------------------
// Trang cập nhật dữ liệu
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// layouts
import MainLayout from '../../../../layouts/main';
// auth
import { useSettingsContext } from '../../../../components/settings';
// component
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// router
import { PATH_ROOTS } from '../../../../routes/paths';
// sections
import { PermissionForm } from '../../../../sections/settings/permission';
// utils
import { permissions } from '../../../../utils/mockData';

// ----------------------------------------------------------------------

UpdatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function UpdatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const {
    query: { id },
  } = useRouter(); // lấy dữ liệu id từ router

  const currentProduct = permissions.filter((obj) => {
    return obj.id === id;
  })[0]; // lọc dữ liệu danh mục cần update

  return (
    <>
      <Head>
        <title>Cập nhật vai trò</title>
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
            { name: 'Cập nhật' },
          ]}
        />

        <PermissionForm isEdit currentProduct={currentProduct || permissions[0]} />
      </Container>
    </>
  );
}
