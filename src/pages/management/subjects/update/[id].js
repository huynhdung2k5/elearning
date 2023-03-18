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
import { SubjectForm } from '../../../../sections/management/subject';
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

  const { subjects } = useFetchData('subjects'); // fectch data
  const { subject } = useFetchData('subject', id); // fetch data

  return (
    <>
      <Head>
        <title>Cập nhật môn học</title>
      </Head>

      <RoleBasedGuard hasContent permission="UPDATE_SUBJECT" permissions={user.permissions}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Môn học"
            links={[
              { name: 'Quản lý', href: PATH_ROOTS.root },
              {
                name: 'Môn học',
                href: PATH_ROOTS.subjects.list,
              },
              { name: 'Danh sách' },
            ]}
          />

          <SubjectForm
            isEdit
            products={subjects}
            currentProduct={subject || (subjects && subjects[0])}
          />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
