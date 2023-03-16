// ----------------------------------------------------------------------
// Filter data
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// mui
import { Button, Divider, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// react
import { useState } from 'react';
// export excel
import { CSVLink } from 'react-csv';
// component
import Iconify from '../../../components/iconify';
// utils
import { fCurrentDate, fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const currentDay = fCurrentDate(new Date(), 'dd-MM-yyyy'); // ngày hiện tại

const currentMonth = fCurrentDate(new Date(), 'MM-yyyy'); // tháng hiện tại

const currentYear = fCurrentDate(new Date(), 'yyyy'); // năm hiện tại

// ----------------------------------------------------------------------

DataFilter.propTypes = {
  data: PropTypes.any,
  filterData: PropTypes.array,
  setFilterData: PropTypes.func,
  csvData: PropTypes.object,
}; // proptype

export default function DataFilter({ data, filterData, setFilterData, csvData }) {
  const [isOpen, setOpen] = useState(null); // handle đóng mở menu

  const [selectedDate, setSelectedDate] = useState(new Date()); // state chọn ngày

  const [filterDate, setFilterDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = async (event) => {
    await setSelectedDate(event);

    setFilterData(
      data?.filter((obj) => {
        return fDate(obj.createdAt, 'dd-MM-yyyy') === fCurrentDate(event, 'dd-MM-yyyy');
      })
    );
    handleClose();
  }; // handle chọn ngày

  const handleFilterData = (value) => {
    setFilterData(value);
    handleClose();
  }; // handle filter data

  const handleFilterDate = () => {
    setFilterData(
      data?.filter((obj) => {
        const date = obj.createdAt.seconds * 1000;
        return date >= filterDate.startDate.getTime() && date <= filterDate.endDate.getTime();
      })
    );

    handleClose();
  }; // filter data theo ngày

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  }; // handle mở menu

  const handleClose = () => {
    setOpen(null);
  }; // handle đóng menu

  const listDataWithTimeline = [
    {
      label: 'Từ trước đến nay',
      time: 'All',
      data,
    },
    {
      label: 'Trong ngày hôm nay',
      time: currentDay,
      data: data?.filter((obj) => {
        return fDate(obj.createdAt, 'dd-MM-yyyy') === currentDay;
      }),
    },
    {
      label: 'Trong tháng này',
      time: currentMonth,
      data: data?.filter((obj) => {
        return fDate(obj.createdAt, 'MM-yyyy') === currentMonth;
      }),
    },
    {
      label: 'Trong năm nay',
      time: currentYear,
      data: data?.filter((obj) => {
        return fDate(obj.createdAt, 'yyyy') === currentYear;
      }),
    },
  ]; // danh sách thời điểm filter

  return (
    <>
      <Stack
        spacing={2}
        direction={{
          sm: 'column',
          md: 'row',
        }}
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<Iconify icon="material-symbols:calendar-month-rounded" />}
        >
          Chọn thời gian xem
        </Button>

        <Menu
          keepMounted
          id="simple-menu"
          anchorEl={isOpen}
          onClose={handleClose}
          open={Boolean(isOpen)}
        >
          {listDataWithTimeline.map((option, index) => (
            <Stack key={index}>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <MenuItem sx={{ padding: 1 }} onClick={() => handleFilterData(option.data)}>
                {option.label} ({option.time})
              </MenuItem>
            </Stack>
          ))}
          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem sx={{ padding: 2 }}>
            <DatePicker
              label="Chọn ngày cụ thể"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Typography variant="subtitle2">Lọc theo khoảng thời gian</Typography>

              <DatePicker
                label="Từ ngày"
                value={filterDate.startDate}
                onChange={(event) => setFilterDate((pre) => ({ ...pre, startDate: event }))}
                renderInput={(params) => <TextField {...params} />}
              />

              <DatePicker
                label="Đến ngày"
                value={filterDate.endDate}
                onChange={(event) => setFilterDate((pre) => ({ ...pre, endDate: event }))}
                renderInput={(params) => <TextField {...params} />}
              />

              <Button variant="contained" onClick={handleFilterDate}>
                Lọc khoảng thời gian
              </Button>
            </Stack>
          </MenuItem>
        </Menu>

        <CSVLink {...csvData} filename="Báo-cáo.csv" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            startIcon={<Iconify icon="vscode-icons:file-type-excel" />}
          >
            Xuất file excel
          </Button>
        </CSVLink>
      </Stack>
    </>
  );
}
