// ----------------------------------------------------------------------
// Bảng danh sách
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react
import { useState } from 'react';
// mui
import {
  Button,
  Divider,
  ListItemText,
  MenuItem,
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';
// components
import MenuPopover from '../../../components/menu-popover';
// utils
import { fDate } from '../../../utils/formatTime';
// components global
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import DataTable from '../../@global/data-table/DataTable';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên quyền', align: 'left' },
  { id: 'description', label: 'Mô tả', align: 'center' },
  { id: 'permissions', label: 'Tính năng khả dụng', align: 'center' },
  { id: 'createdBy', label: 'Tạo bởi', align: 'center' },
  { id: 'updatedBy', label: 'Cập nhật bởi', align: 'center' },
  { id: 'createdAt', label: 'Ngày tạo', align: 'center' },
  { id: 'updatedAt', label: 'Ngày cập nhật', align: 'center' },
  { id: '' },
]; // header của bảng dữ liệu

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

RolesTable.propTypes = {
  products: PropTypes.any,
  options: PropTypes.array,
}; // proptype

export default function RolesTable({ products, options }) {
  const [openTeachersPopover, setOpenTeachersPopover] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const rowData = (row) => {
    return (
      <>
        <TableCell>
          <Typography variant="subtitle2">{row?.name}</Typography>
        </TableCell>

        <Tooltip title={row?.description}>
          <TableCell
            align="center"
            sx={{
              maxWidth: '300px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row?.description || 'Không'}
          </TableCell>
        </Tooltip>

        <TableCell align="center">
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={(event) => {
              setPermissions(row?.permissions);
              setOpenTeachersPopover(event.currentTarget);
            }}
          >
            Danh sách tính năng
          </Button>

          <MenuPopover
            open={openTeachersPopover}
            onClose={() => setOpenTeachersPopover(null)}
            arrow="left-top"
            sx={{ width: ITEM_HEIGHT * 5, boxShadow: 1 }}
          >
            <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
              <Typography variant="subtitle1" p={1}>
                Danh sách tính năng
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {permissions.map((permission, index) => (
                <MenuItem key={index} sx={{ height: ITEM_HEIGHT }}>
                  <ListItemText
                    primary={permission.description}
                    secondary={permission.name}
                    primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                    secondaryTypographyProps={{ typography: 'caption' }}
                  />
                </MenuItem>
              ))}
            </Scrollbar>
          </MenuPopover>
        </TableCell>

        <TableCell align="center">{row?.createdBy || 'Không xác định'}</TableCell>

        <TableCell align="center">{row?.updatedBy || 'Không xác định'}</TableCell>

        <TableCell align="center">{fDate(row?.createdAt) || 'Không xác định'}</TableCell>

        <TableCell align="center">{fDate(row?.updatedAt) || 'Không xác định'}</TableCell>
      </>
    );
  }; // các dòng dữ liệu của bảng

  return (
    <>
      <DataTable
        tableHead={TABLE_HEAD}
        products={products}
        options={options}
        collection="roles"
        filterLabel="Quyền truy cập"
        valueFilter="name"
        rowTableData={rowData}
      />
    </>
  );
}
