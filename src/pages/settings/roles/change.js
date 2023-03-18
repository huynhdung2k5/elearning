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
import { ChangeRolesTable } from '../../../sections/settings/roles';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

ChangePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ChangePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { roles } = useFetchData('roles');
  const { users } = useFetchData('users');

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
              href: PATH_ROOTS.roles.list,
            },
            { name: 'Cấp vai trò' },
          ]}
        />

        <ChangeRolesTable products={users} options={roles?.map((data) => data.name)} />
      </Container>
    </>
  );
}
