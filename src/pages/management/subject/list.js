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
import { subjects } from '../../../utils/mockData';

// ----------------------------------------------------------------------

ListPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function ListPage() {
  const { themeStretch } = useSettingsContext(); // theme setting

  const [filterData, setFilterData] = useState([]); // filter data

  useEffect(() => {
    setFilterData(subjects);
  }, []); // lấy dữ liệu filter

  const csvData = {
    data: filterData?.map((item) => ({
      'Tên môn học': item.name,
      'Mô tả': item.description,
      'Tạo bởi': item.createdBy,
      'Cập nhật bởi': item.updatedBy,
      'Ngày tạo': fDate(item.createdAt),
      'Ngày cập nhật': fDate(item.updatedAt),
    })),
  }; // data csv

  return (
    <>
      <Head>
        <title>Danh sách môn học</title>
      </Head>
      <RoleBasedGuard hasContent roles={['teacher', 'admin']}>
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
            action={
              <Button
                component={NextLink}
                href={PATH_ROOTS.subject.create}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                THÊM MÔN HỌC
              </Button>
            }
          />

          <DataFilter
            data={subjects}
            filterData={filterData}
            setFilterData={setFilterData}
            csvData={csvData}
          />

          <Box p={1} />

          <SubjectTable products={filterData} />
        </Container>
      </RoleBasedGuard>
    </>
  );
}
