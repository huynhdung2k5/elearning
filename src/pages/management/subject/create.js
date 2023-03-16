// ----------------------------------------------------------------------
// Trang thêm data
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
import { SubjectForm } from '../../../sections/management/subject';

// ----------------------------------------------------------------------

CreatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function CreatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  return (
    <>
      <Head>
        <title>Thêm môn học mới</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Môn học"
          links={[
            { name: 'Quản lý', href: PATH_ROOTS.root },
            {
              name: 'Môn học',
              href: PATH_ROOTS.subject.list,
            },
            { name: 'Danh sách' },
          ]}
        />

        <SubjectForm />
      </Container>
    </>
  );
}
