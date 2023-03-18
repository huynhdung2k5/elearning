// ----------------------------------------------------------------------
// Trang tổng quan
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// redux
import { useEffect, useState } from 'react';
// lodash
import { meanBy, merge, sumBy } from 'lodash';
// @mui
import { Container, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// fakerjs
import { faker } from '@faker-js/faker';
// layouts
import MainLayout from '../../layouts/main';
// hook
import { useSettingsContext } from '../../components/settings';
// utils
import { useFetchData } from '../../api/service/crud-service';
// sections
import DataFilter from '../../sections/@global/data-filter/DataFilter';
import WidgetSummary from '../../sections/general/overview/WidgetSummary';

// ----------------------------------------------------------------------

OverviewPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function OverviewPage() {
  const theme = useTheme(); // theme

  const { themeStretch } = useSettingsContext(); // theme setting

  const grade = Array.from({ length: 12 }).map(() => ({
    id: faker.datatype.uuid(),
    class: faker.datatype.number({ min: 1, max: 15 }),
  })); // mock data

  const classrooms = Array.from({ length: 100 }).map(() => ({
    id: faker.datatype.uuid(),
    student: faker.datatype.number({ min: 30, max: 45 }),
  })); // mock data

  const teachers = Array.from({ length: 100 }).map(() => ({
    id: faker.datatype.uuid(),
    class: faker.datatype.number({ min: 2, max: 10 }),
  })); // mock data

  const [filterData, setFilterData] = useState({}); // filter data

  useEffect(() => {
    setFilterData({
      grade,
      classrooms,
      teachers,
    });
  }, []); // lấy dữ liệu filter

  // const csvData = {
  //   data: filterData?.map((item) => ({
  //     Name: item.name,
  //   })),
  // }; // data csv

  return (
    <>
      <Head>
        <title>Tổng quan về trường học</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <DataFilter
              data={grade}
              filterData={filterData}
              setFilterData={setFilterData}
              csvData={csvData}
            /> */}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Tổng số lớp học"
              icon="healthicons:i-training-class-negative"
              iconColor="primary.main"
              total={`${sumBy(filterData.grade, 'class')} lớp học`}
              average={`Trung bình mỗi khối có ${Math.round(
                meanBy(filterData.grade, 'class')
              )} lớp học`}
              chart={{
                colors: [theme.palette.primary.main],
                series: filterData.grade?.map((data) => data.class),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Tổng số học sinh"
              icon="healthicons:i-training-class-negative"
              iconColor="warning.main"
              total={`${sumBy(filterData.classrooms, 'student')} học sinh`}
              average={`Trung bình mỗi lớp có ${Math.round(
                meanBy(filterData.classrooms, 'student')
              )} học sinh`}
              chart={{
                colors: [theme.palette.warning.main],
                series: filterData.classrooms?.map((data) => data.student),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Giáo viên giảng dạy"
              icon="healthicons:i-training-class-negative"
              iconColor="error.main"
              total={`${filterData.teachers?.length} giáo viên`}
              average={`Trung bình mỗi giáo viên dạy ${Math.round(
                meanBy(filterData.teachers, 'class')
              )} lớp`}
              chart={{
                colors: [theme.palette.error.main],
                series: filterData.teachers?.map((data) => data.class),
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
