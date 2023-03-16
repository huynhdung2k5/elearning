// ----------------------------------------------------------------------
// Bảng danh sách
// ----------------------------------------------------------------------

// proptype
import PropTypes from 'prop-types';
// mui
import { TableCell } from '@mui/material';
// components
import Label from '../../../components/label/Label';
// utils
import { fDate } from '../../../utils/formatTime';
// components global
import DataTable from '../../@global/data-table/DataTable';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'notification', label: 'Thông báo', align: 'left' },
  { id: 'createdAt', label: 'Ngày', align: 'center' },
  { id: 'read', label: 'Tình trạng', align: 'center' },
  { id: '' },
]; // header của bảng dữ liệu

const rowData = (row) => {
  return (
    <>
      <TableCell>{row?.notification}</TableCell>

      <TableCell align="center">{fDate(row?.createdAt)}</TableCell>

      <TableCell align="center">
        <Label
          variant="soft"
          color={row?.read ? 'info' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.read ? 'Đã đọc' : 'Chưa đọc'}
        </Label>
      </TableCell>
    </>
  );
}; // các dòng dữ liệu của bảng

// ----------------------------------------------------------------------

NotificationsTable.propTypes = {
  products: PropTypes.any,
}; // proptype

export default function NotificationsTable({ products }) {
  return (
    <>
      <DataTable
        tableHead={TABLE_HEAD}
        products={products}
        collection="notifications"
        rowTableData={rowData}
      />
    </>
  );
}
