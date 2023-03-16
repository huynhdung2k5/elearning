// ----------------------------------------------------------------------
// In hóa đơn
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react next
import { forwardRef, useEffect, useState } from 'react';
// dayjs
import dayjs from 'dayjs';
// lodash
import { sumBy } from 'lodash';
// mui
import {
  Card,
  Dialog,
  Divider,
  Grid,
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
// child components
import ShopInfomation from './ShopInfomation';

// ----------------------------------------------------------------------

// transition
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

PrintBill.propTypes = {
  tableNumber: PropTypes.string,
  values: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}; // proptypes

const TABLE_HEAD = [
  { id: 'name', label: 'Tên món', align: 'left' },
  { id: 'price', label: 'Đơn giá', align: 'center' },
  { id: 'count', label: 'Số lượng', align: 'center' },
]; // header của bảng dữ liệu

export default function PrintBill({ tableNumber, values, open, setOpen }) {
  const { dish, totalCustomer, discount, note, customer } = values || {}; // lấy ra các phần tử trong dish state

  const [tableData, setTableData] = useState([]); // dữ liệu trong bảng

  useEffect(() => {
    if (dish?.length) {
      const dishWithQuantity = dish.filter((obj) => {
        return obj.quantity > 0;
      }); // lấy ra món với số lượng lớn hơn 0
      setTableData(dishWithQuantity);
    }
  }, [dish]); // kiểm tra có dữ liệu, tiến hành lưu vào bảng

  const handleSumTotalPrice = (priceList, discount) => {
    const totalPrice = sumBy(priceList, 'totalPrice');

    if (discount) {
      const discountPrice = totalPrice * (discount / 100);
      return totalPrice - discountPrice;
    }
    return totalPrice;
  }; // xử lý tính tổng tiền và giảm giá

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
            <ShopInfomation title="Hóa đơn bán hàng" />

            <Typography fontWeight={700} variant="h5" textAlign="center">
              {tableNumber}
            </Typography>
          </Stack>

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2" textAlign="start">
                Thu ngân : thungan
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" textAlign="end">
                Số khách : {totalCustomer || 1}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" textAlign="start">
                Giảm giá : {discount || 0}%
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" textAlign="end">
                Tên khách hàng : {customer?.name || 'Khách hàng'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" textAlign="start">
                Thời gian : {dayjs().format('hh:mm DD/MM/YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" fontStyle="italic" textAlign="start">
                Ghi chú : {note || 'Không có'}
              </Typography>
            </Grid>
          </Grid>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Table size="medium">
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row?.name}</TableCell>

                    <TableCell align="center">{fCurrency(row?.price)}</TableCell>

                    <TableCell align="center">{row?.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />

          <Typography fontWeight={700}>
            Tổng tiền : {fCurrency(handleSumTotalPrice(dish, discount)) || '0đ'}{' '}
            {discount > 0 && `( Giảm giá ${discount}% )`}
          </Typography>

          <Stack>
            <Typography fontSize={13} fontStyle="italic" textAlign="center">
              Vui lòng kiểm tra hóa đơn trước khi thanh toán.
            </Typography>
            <Typography variant="body" fontStyle="italic" textAlign="center">
              Cảm ơn và xin hẹn gặp lại quý khách !
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Dialog>
  );
}
