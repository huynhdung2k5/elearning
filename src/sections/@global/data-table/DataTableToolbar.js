// ----------------------------------------------------------------------
// Toolbar của bảng nhân viên
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// @mui
import {
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

DataTableToolbar.propTypes = {
  collection: PropTypes.string,
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterLabel: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  filterStatus: PropTypes.array,
  onFilterStatus: PropTypes.func,
  statusOptions: PropTypes.array,
}; // proptype

export default function DataTableToolbar({
  collection,
  isFiltered,
  filterName,
  filterLabel,
  filterStatus,
  onFilterName,
  statusOptions,
  onResetFilter,
  onFilterStatus,
}) {
  const allowFilter = {
    subjects: true,
  };
  return (
    <Stack
      spacing={allowFilter[collection] ? 0 : 2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <FormControl
        sx={{
          width: { xs: 1, md: 240 },
          display: allowFilter[collection] ? 'none' : 'flex',
        }}
      >
        <InputLabel sx={{ '&.Mui-focused': { color: 'text.primary' } }}>{filterLabel}</InputLabel>
        <Select
          multiple
          value={filterStatus}
          onChange={onFilterStatus}
          input={<OutlinedInput label={filterLabel} />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
        >
          {statusOptions?.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              sx={{
                p: 0,
                mx: 1,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              <Checkbox disableRipple size="small" checked={filterStatus.includes(option)} />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Nhập từ khoá để tìm kiếm..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="info"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Làm mới
        </Button>
      )}
    </Stack>
  );
}
