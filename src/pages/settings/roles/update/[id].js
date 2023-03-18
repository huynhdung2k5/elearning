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
// settings
import { useSettingsContext } from '../../../../components/settings';
// auth
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';
import { useAuthContext } from '../../../../auth/useAuthContext';
// component
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// router
import { PATH_ROOTS } from '../../../../routes/paths';
// sections
import { RolesForm } from '../../../../sections/settings/roles';
// api
import { useFetchData } from '../../../../api/service/crud-service';

// ----------------------------------------------------------------------

UpdatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function UpdatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const {
    query: { id },
  } = useRouter(); // lấy dữ liệu id từ router

  const { roles } = useFetchData('roles'); // fetch data
  const { role } = useFetchData('roles', id); // fetch data
  const { groupPermissions } = useFetchData('group-permissions'); // fetch data

  return (
    <>
      <Head>
        <title>Cập nhật vai trò</title>
      </Head>

      <RoleBasedGuard hasContent permission="UPDATE_ROLE" permissions={user.permissions}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Vai trò"
            links={[
              { name: 'Cài đặt', href: PATH_ROOTS.root },
              {
                name: 'Vai trò',
                href: PATH_ROOTS.roles.list,
              },
              { name: 'Cập nhật' },
            ]}
          />

          <RolesForm
            isEdit
            currentProduct={role || (roles && roles[0])}
            groupPermissions={groupPermissions}
          />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
