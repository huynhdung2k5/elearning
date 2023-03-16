// ----------------------------------------------------------------------
// Bảng danh sách các dữ liệu
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// mui
import { Button, Card, IconButton, Table, TableBody, TableContainer, Tooltip } from '@mui/material';
// components
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '../../../components/table';
// routes
import { PATH_ROOTS } from '../../../routes/paths';
// components
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useSnackbar } from '../../../components/snackbar';
// child components
import DataTableRow from './DataTableRow';
import DataTableToolbar from './DataTableToolbar';
// utils
import applyFilter from '../../../utils/applyFilter';
// firebase
import { deleteDocument, deleteDocuments } from '../../../lib/firebase/service';

// ----------------------------------------------------------------------

DataTable.propTypes = {
  products: PropTypes.array,
  options: PropTypes.array,
  tableHead: PropTypes.array,
  valueFilter: PropTypes.string,
  filterLabel: PropTypes.string,
  collection: PropTypes.string,
  rowTableData: PropTypes.any,
}; // proptype

export default function DataTable({
  products,
  options,
  rowTableData,
  tableHead,
  valueFilter,
  filterLabel,
  collection,
}) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
    defaultOrder: 'desc',
  }); // lấy các method & prop từ form

  const { push } = useRouter(); // push router

  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const [tableData, setTableData] = useState([]); // dữ liệu bảng

  const [filterName, setFilterName] = useState(''); // filter dữ liệu bảng

  const [filterStatus, setFilterStatus] = useState([]); // filter danh mục

  const [openConfirm, setOpenConfirm] = useState(false); // state đóng mở hành động

  useEffect(() => {
    if (products?.length) {
      setTableData(products);
    }
  }, [products]); // set giá trị của bảng

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    valueFilter,
  }); // data sau khi được filter

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage); // số hàng trong 1 trang bảng

  const denseHeight = dense ? 60 : 80; // chiều cao bảng

  const isFiltered = filterName !== '' || !!filterStatus.length; // trạng thái đang tìm kiếm/lựa chọn

  const isNotFound = (!dataFiltered.length && !!filterName) || !dataFiltered.length; // trạng thái không tìm thấy

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  }; // sự kiện mở confirm

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }; // sự kiện đóng cofirm

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }; // sự kiện tìm kiếm

  const handleFilterStatus = (event) => {
    const {
      target: { value },
    } = event;
    setPage(0);
    setFilterStatus(typeof value === 'string' ? value.split(',') : value);
  }; // sự kiện chọn danh mục

  const handleDeleteRow = async (id) => {
    await deleteDocument(collection, id);
    enqueueSnackbar('Đã xóa thành công !');
    setSelected([]);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }

    handleCloseConfirm();
  }; // handle xóa một hàng

  const handleDeleteRows = async (selectedRows) => {
    await deleteDocuments(collection, selectedRows);
    enqueueSnackbar('Đã xóa thành công !');
    setSelected([]);
    setTableData([]);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }

    handleCloseConfirm();
  }; // handle xóa nhiều hàng

  const handleEditRow = (id) => {
    push(PATH_ROOTS[collection].update(id));
  }; // handle cập nhật

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus([]);
  }; // handle reset

  return (
    <>
      <Card>
        <DataTableToolbar
          collection={collection}
          filterName={filterName}
          filterStatus={filterStatus}
          onFilterName={handleFilterName}
          onFilterStatus={handleFilterStatus}
          statusOptions={options}
          isFiltered={isFiltered}
          filterLabel={filterLabel}
          onResetFilter={handleResetFilter}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Xóa">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960, cursor: 'pointer' }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={tableHead}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <DataTableRow
                        key={row.id}
                        row={row}
                        collection={collection}
                        rowTableData={rowTableData}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          //
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xác nhận"
        content={
          <>
            Bạn có muốn chắc muốn xóa <strong> {selected.length} </strong> mục này ?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Xóa
          </Button>
        }
      />
    </>
  );
}
