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
import { SubjectForm } from '../../../../sections/management/subject';
// utils
import { subjects } from '../../../../utils/mockData';

// ----------------------------------------------------------------------

UpdatePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function UpdatePage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const {
    query: { id },
  } = useRouter(); // lấy dữ liệu id từ router

  const currentProduct = subjects.filter((obj) => {
    return obj.id === id;
  })[0]; // lọc dữ liệu danh mục cần update

  return (
    <>
      <Head>
        <title>Cập nhật môn học</title>
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

        <SubjectForm isEdit currentProduct={currentProduct || subjects[0]} />
      </Container>
    </>
  );
}
