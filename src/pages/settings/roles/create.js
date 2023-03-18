// ----------------------------------------------------------------------
// Trang thêm data
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
import { RolesForm } from '../../../sections/settings/roles';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

CreatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function CreatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const { groupPermissions } = useFetchData('group-permissions'); // fetch data

  return (
    <>
      <Head>
        <title>Tạo vai trò mới</title>
      </Head>

      <RoleBasedGuard hasContent permission="CREATE_ROLE" permissions={user.permissions}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Vai trò"
            links={[
              { name: 'Cài đặt', href: PATH_ROOTS.root },
              {
                name: 'Vai trò',
                href: PATH_ROOTS.roles.list,
              },
              { name: 'Tạo mới' },
            ]}
          />

          <RolesForm groupPermissions={groupPermissions} />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
