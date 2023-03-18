// ----------------------------------------------------------------------
// Trang phân bổ giáo viên
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
import { TeacherAllocation } from '../../../sections/management/subject';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

TeacherAllocationPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function TeacherAllocationPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const { subjects } = useFetchData('subjects'); // fetch data
  const { teachers } = useFetchData('teachers'); // fetch data

  return (
    <>
      <Head>
        <title>Phân bổ giáo viên</title>
      </Head>

      <RoleBasedGuard hasContent permission="ALLOC_TEACHER" permissions={user.permissions}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Phân bổ giáo viên"
            links={[
              { name: 'Quản lý', href: PATH_ROOTS.root },
              {
                name: 'Môn học',
                href: PATH_ROOTS.subject.list,
              },
              { name: 'Phân bổ giáo viên' },
            ]}
          />
        </Container>

        <TeacherAllocation teachers={teachers} subjects={subjects} />
      </RoleBasedGuard>
    </>
  );
}
