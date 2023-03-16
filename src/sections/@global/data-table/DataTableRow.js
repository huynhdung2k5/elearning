// ----------------------------------------------------------------------
// Danh sách dữ liệu trong hàng
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react
import { useState } from 'react';
// @mui
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
// utils
// components
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { useSnackbar } from '../../../components/snackbar';
// child components
import PrintSalary from '../print/PrintSalary';
import PrintBill from '../print/PrintBill';
// firebase
import { updateDocument } from '../../../lib/firebase/service';

// ----------------------------------------------------------------------

DataTableRow.propTypes = {
  row: PropTypes.object,
  collection: PropTypes.string,
  rowTableData: PropTypes.any,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
}; // proptype

export default function DataTableRow({
  row,
  collection,
  rowTableData,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const [openConfirm, setOpenConfirm] = useState(false); // state đóng mở comfirm

  const [openPopover, setOpenPopover] = useState(null); // state đóng mở popover

  const [openPrintSalary, setOpenPrintSalary] = useState(false); // state đóng mở in bảng lương

  const [openPrintBill, setOpenPrintBill] = useState(false); // state đóng mở in bill

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  }; // handle mở confirm

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }; // handle đóng comfirm

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  }; // handle mở popover

  const handleClosePopover = () => {
    setOpenPopover(null);
  }; // handle đóng popover

  const handlePrintSalary = () => {
    setOpenPrintSalary(true);
    handleClosePopover();
    setTimeout(() => {
      window.print();
    }, 1000);
  }; // handle in bảng lương

  const handlePrintBills = async () => {
    handleClosePopover();
    setOpenPrintBill(true);
    await updateDocument(collection, row?.id, {
      printTimes: isNaN(row?.printTimes) ? 1 : row?.printTimes + 1,
    });

    setTimeout(() => {
      window.print();
    }, 1000);
  }; // handle in hóa đơn

  const handlePrintDelivery = async () => {
    handleClosePopover();
    await setOpenPrintBill(true);

    setTimeout(() => {
      window.print();
    }, 1000);
  }; // handle in hóa đơn

  const handleCompleteDelivery = async () => {
    await updateDocument(collection, row?.id, {
      status: 'Đã giao hàng',
    });

    handleClosePopover();

    enqueueSnackbar('Cập nhật đơn hàng thành công !');
  }; // cập nhật hoàn thành cho đơn giao hàng

  return (
    <>
      <TableRow hover selected={selected} sx={{ whiteSpace: 'nowrap' }}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {rowTableData(row)}

        <TableCell align="right">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {collection === 'staff' && (
          <>
            <MenuItem onClick={handlePrintSalary} sx={{ color: 'info.main' }}>
              <Iconify icon="material-symbols:print" />
              Bảng lương
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        {collection === 'bills' && (
          <>
            <MenuItem onClick={handlePrintBills} sx={{ color: 'info.main' }}>
              <Iconify icon="material-symbols:print" />
              In hóa đơn
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        {collection === 'delivery' && (
          <>
            <MenuItem onClick={handlePrintDelivery} sx={{ color: 'info.main' }}>
              <Iconify icon="material-symbols:print" />
              In đơn hàng
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        {collection === 'delivery' && (
          <>
            <MenuItem onClick={handleCompleteDelivery} sx={{ color: 'success.main' }}>
              <Iconify icon="mdi:truck-delivery" />
              Hoàn thành
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        {collection !== 'bills' && (
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Chỉnh sửa
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Xóa
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xác nhận"
        content="Bạn có chắc muốn xóa ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Xóa
          </Button>
        }
      />

      <PrintSalary values={row} open={openPrintSalary} setOpen={setOpenPrintSalary} />

      <PrintBill
        values={row}
        tableNumber={row?.tableNumber}
        open={openPrintBill}
        setOpen={setOpenPrintBill}
      />
    </>
  );
}
