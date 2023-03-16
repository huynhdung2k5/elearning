// ----------------------------------------------------------------------
// In bảng lương
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react next
import { forwardRef, useEffect, useState } from 'react';
// mui
import {
  Card,
  Dialog,
  Divider,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
// components
import { TableHeadCustom } from '../../../components/table';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { fCurrentDate } from '../../../utils/formatTime';
// child components
import ShopInfomation from './ShopInfomation';

// ----------------------------------------------------------------------

// transition
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

PrintSalary.propTypes = {
  values: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}; // proptypes

const TABLE_HEAD = [
  { id: 'hourlyWages', label: 'Cơ bản', align: 'left' },
  { id: 'workingHours', label: 'Giờ làm', align: 'center' },
  { id: 'feesIncurred', label: 'Phụ phí', align: 'center' },
]; // header của bảng dữ liệu

export default function PrintSalary({ values, open, setOpen }) {
  const { name, phoneNumber, description, feesIncurred, workingHours, hourlyWages, position } =
    values || {}; // lấy ra các phần tử trong dish state

  const [tableData, setTableData] = useState([]); // dữ liệu trong bảng

  useEffect(() => {
    if (values) {
      setTableData([{ feesIncurred, workingHours, hourlyWages }]);
    }
  }, [values]); // kiểm tra có dữ liệu, tiến hành lưu vào bảng

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
    >
      <Card
        sx={{
          margin: 2,
          padding: 2,
          border: '1px dashed black',
        }}
      >
        <Stack spacing={1}>
          <Stack>
            <ShopInfomation title="Bảng tính lương" />
          </Stack>

          <Typography variant="body2">Họ và tên : {name}</Typography>

          <Typography variant="body2">Số điện thoại : {phoneNumber}</Typography>

          <Typography variant="body2">Chức vụ : {position}</Typography>

          <Typography variant="body2">Ngày tính lương : {fCurrentDate(new Date())}</Typography>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Table size="medium">
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{fCurrency(row?.hourlyWages)}</TableCell>

                    <TableCell align="center">{row?.workingHours}h</TableCell>

                    <TableCell align="center">{fCurrency(row?.feesIncurred)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />

          <Typography fontWeight={700} variant="h4">
            Tổng tiền lương : {fCurrency(workingHours * hourlyWages - feesIncurred)}
          </Typography>

          <Typography variant="body2">Ghi chú : {description}</Typography>

          <Typography fontSize={13} fontStyle="italic" textAlign="center">
            Mọi thắc mắc vui lòng liên hệ với bộ phận quản lý.
          </Typography>
        </Stack>
      </Card>
    </Dialog>
  );
}
