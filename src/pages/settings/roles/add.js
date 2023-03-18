// ----------------------------------------------------------------------
// Trang đổi quyền truy cập
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// layouts
import MainLayout from '../../../layouts/main';
// settings
import { useSettingsContext } from '../../../components/settings';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import { useAuthContext } from '../../../auth/useAuthContext';
// component
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// router
import { PATH_ROOTS } from '../../../routes/paths';
// sections
import { AddRolesTable } from '../../../sections/settings/roles';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

AddPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function AddPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const { roles } = useFetchData('roles'); // fetch data
  const { users } = useFetchData('users'); // fetch data

  return (
    <>
      <Head>
        <title>Cấp vai trò cho người dùng</title>
      </Head>

      <RoleBasedGuard hasContent permission="ADD_ROLE" permissions={user.permissions}>
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

          <AddRolesTable products={users} options={roles?.map((data) => data.name)} />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
