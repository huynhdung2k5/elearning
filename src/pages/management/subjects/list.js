// ----------------------------------------------------------------------
// Danh sách danh mục
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
import NextLink from 'next/link';
// react
import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Container } from '@mui/material';
// layouts
import MainLayout from '../../../layouts/main';
// setting
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
import DataFilter from '../../../sections/@global/data-filter/DataFilter';
import { SubjectTable } from '../../../sections/management/subject';
// utils
import { fDate } from '../../../utils/formatTime';
// api
import { useFetchData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

ListPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ListPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const { user } = useAuthContext(); // user context

  const { subjects } = useFetchData('subjects'); // fectch data

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(subjects);
  }, [subjects]); // lấy dữ liệu filter

  // const csvData = {
  //   data: filterData?.map((item) => ({
  //     'Tên môn học': item.name,
  //     'Mô tả': item.description,
  //     'Tạo bởi': item.createdBy || 'Không xác định',
  //     'Cập nhật bởi': item.updatedBy || 'Không xác định',
  //     'Ngày tạo': fDate(item.createdAt) || 'Không xác định',
  //     'Ngày cập nhật': fDate(item.updatedAt) || 'Không xác định',
  //   })),
  // }; // data csv

  const csvData = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Jane', age: 25, email: 'jane@example.com' },
  ];

  console.log(csvData);

  return (
    <>
      <Head>
        <title>Danh sách môn học</title>
      </Head>

      <RoleBasedGuard hasContent permission="GET_SUBJECT_LIST" permissions={user.permissions}>
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
            action={
              <Button
                component={NextLink}
                href={PATH_ROOTS.subjects.create}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                THÊM MÔN HỌC
              </Button>
            }
          />

          {/* <DataFilter
            data={subjects}
            filterData={filterData}
            setFilterData={setFilterData}
            csvData={csvData}
          />

          <Box p={1} /> */}

          <SubjectTable products={filterData} />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
