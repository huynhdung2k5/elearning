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
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';
// components
import Image from '../../../components/image';
import Label from '../../../components/label';
import MenuPopover from '../../../components/menu-popover';
// utils
import { fDate } from '../../../utils/formatTime';
// components global
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import DataTable from '../../@global/data-table/DataTable';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên môn học', align: 'left' },
  { id: 'description', label: 'Mô tả môn học', align: 'center' },
  { id: 'teachers', label: 'Giáo viên phụ trách', align: 'center' },
  { id: 'classes', label: 'Lớp được phân bố', align: 'center' },
  { id: 'branch', label: 'Nhóm môn học', align: 'center' },
  { id: 'numberOfLessons', label: 'Số tiết học', align: 'center' },
  { id: 'examRules', label: 'Quy chế thi cử', align: 'center' },
  { id: 'createdBy', label: 'Tạo bởi', align: 'center' },
  { id: 'updatedBy', label: 'Cập nhật bởi', align: 'center' },
  { id: 'createdAt', label: 'Ngày tạo', align: 'center' },
  { id: 'updatedAt', label: 'Ngày cập nhật', align: 'center' },
  { id: '' },
]; // header của bảng dữ liệu

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

SubjectTable.propTypes = {
  products: PropTypes.any,
}; // proptype

export default function SubjectTable({ products }) {
  const [openTeachersPopover, setOpenTeachersPopover] = useState(null);
  const [openStudentsPopover, setOpenStudentsPopover] = useState(null);

  const rowData = (row) => {
    return (
      <>
        <TableCell>
          <Stack spacing={1} direction="row" alignItems="center">
            <Image
              visibleByDefault
              alt={row?.name}
              src={row?.photoURL}
              sx={{ borderRadius: 999, width: 36, height: 36 }}
            />

            <Typography variant="subtitle2">{row?.name}</Typography>
          </Stack>
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
            {row?.description}
          </TableCell>
        </Tooltip>

        <TableCell align="center">
          <Button
            size="small"
            color="inherit"
            onClick={(event) => setOpenTeachersPopover(event.currentTarget)}
          >
            Danh sách giáo viên
          </Button>

          <MenuPopover
            open={openTeachersPopover}
            onClose={() => setOpenTeachersPopover(null)}
            arrow="left-top"
            sx={{ width: ITEM_HEIGHT * 5, boxShadow: 1 }}
          >
            <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
              <Typography variant="subtitle1" p={1}>
                Giáo viên phụ trách
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {row?.teachers.map((teacher, index) => (
                <MenuItem key={index} sx={{ height: ITEM_HEIGHT }}>
                  <ListItemAvatar>
                    <Image
                      visibleByDefault
                      alt={teacher?.name}
                      src={teacher.photoURL}
                      sx={{ borderRadius: 999, width: 32, height: 32 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={teacher.name}
                    secondary={teacher.name}
                    primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                    secondaryTypographyProps={{ typography: 'caption' }}
                  />
                </MenuItem>
              ))}
            </Scrollbar>
          </MenuPopover>
        </TableCell>

        <TableCell align="center">
          <Button
            size="small"
            color="inherit"
            onClick={(event) => setOpenStudentsPopover(event.currentTarget)}
          >
            Danh sách lớp
          </Button>

          <MenuPopover
            open={openStudentsPopover}
            onClose={() => setOpenStudentsPopover(null)}
            arrow="left-top"
            sx={{ width: ITEM_HEIGHT * 5, boxShadow: 1 }}
          >
            <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
              <Typography variant="subtitle1" p={1}>
                Danh sách lớp phân bố
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {row?.classes.map((item, index) => (
                <MenuItem key={index} sx={{ height: ITEM_HEIGHT }}>
                  <ListItemText
                    primary={
                      item.grade.name +
                      ` ( ${item.grade.classes.length} lớp, ${item.grade.students} học sinh )`
                    }
                    secondary={item.grade.classes.map((item) => item + ' ')}
                    primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                    secondaryTypographyProps={{ typography: 'caption' }}
                  />
                </MenuItem>
              ))}
            </Scrollbar>
          </MenuPopover>
        </TableCell>

        <TableCell align="center">{row?.branch}</TableCell>

        <TableCell align="center">{row?.numberOfLessons}</TableCell>

        <TableCell align="center">
          {row?.examRules?.map((rule, index) => (
            <Label color="info" mr={1} variant="soft" key={index}>
              {rule}
            </Label>
          ))}
        </TableCell>

        <TableCell align="center">{row?.createdBy}</TableCell>

        <TableCell align="center">{row?.updatedBy}</TableCell>

        <TableCell align="center">{fDate(row?.createdAt)}</TableCell>

        <TableCell align="center">{fDate(row?.updatedAt)}</TableCell>
      </>
    );
  }; // các dòng dữ liệu của bảng

  return (
    <>
      <DataTable
        tableHead={TABLE_HEAD}
        products={products}
        options={['ádf']}
        collection="customers"
        filterLabel="Loại khách hàng"
        valueFilter="type"
        rowTableData={rowData}
      />
    </>
  );
}
