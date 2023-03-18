// ----------------------------------------------------------------------
// Trang quyền truy cập
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Container } from '@mui/material';
// layouts
import MainLayout from '../../../layouts/main';
// settings
import { useSettingsContext } from '../../../components/settings';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import { useAuthContext } from '../../../auth/useAuthContext';
// component
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
// router
import { PATH_ROOTS } from '../../../routes/paths';
// sections
import { RolesTable } from '../../../sections/settings/roles';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

ListPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ListPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const { roles } = useFetchData('roles'); // fetch data

  return (
    <>
      <Head>
        <title>Danh sách vai trò</title>
      </Head>

      <RoleBasedGuard hasContent permission="READ_ROLE" permissions={user.permissions}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Vai trò"
            links={[
              { name: 'Cài đặt', href: PATH_ROOTS.root },
              {
                name: 'Vai trò',
                href: PATH_ROOTS.roles.list,
              },
              { name: 'Danh sách' },
            ]}
            action={
              <Button
                component={NextLink}
                href={PATH_ROOTS.roles.create}
                color="info"
                variant="contained"
                startIcon={<Iconify icon="fluent-mdl2:permissions-solid" />}
              >
                THÊM QUYỀN MỚI
              </Button>
            }
          />

          <RolesTable products={roles} options={roles?.map((data) => data.name)} />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
