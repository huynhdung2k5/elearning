// ----------------------------------------------------------------------
// axios gọi API
// ----------------------------------------------------------------------
import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY }); // khởi tạo API từ baseURL

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
); // trả về dữ liệu API

export default axiosInstance;
