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
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
          sx={{ color: 'warning.main' }}
        >
          <Iconify icon="eva:edit-fill" />
          Chỉnh sửa
        </MenuItem>

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
    </>
  );
}
