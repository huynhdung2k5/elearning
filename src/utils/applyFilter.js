// ----------------------------------------------------------------------
// Tìm kiếm và filter dữ liệu trong bảng
// ----------------------------------------------------------------------

export default function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  valueFilter,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]); // map lấy các ký tự trong chuỗi tìm kiếm

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  }); // sắp xếp các ký tự

  inputData = stabilizedThis.map((el) => el[0]); // lấy ký tự trong mảng gắn vào input data

  if (filterName) {
    inputData = inputData.filter(
      (product) => product.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  } // nếu lọc bằng search trả về phần tử chứa trong tên sản phẩm

  if (filterStatus?.length) {
    inputData = inputData.filter((product) => filterStatus.includes(product?.[valueFilter]));
  } // nếu lọc bằng select option trả về các phần tử trong danh mục

  return inputData;
}
