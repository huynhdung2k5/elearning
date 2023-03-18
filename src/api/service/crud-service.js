import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export const useFetchData = (endpoint, id = '') => {
  const [data, getData] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get(`${endpoint}/${id}`);

      if (data) getData(data);
    };
    getRoles();
  }, [endpoint]);

  return data;
}; // lấy dữ liệu

export const addData = async (endpoint, data) => {
  await axios.post(endpoint, data);
}; // thêm data

export const updateData = async (endpoint, id = '', data) => {
  await axios.patch(`${endpoint}/${id}`, data);
}; // thêm data

export const updateAllData = async (endpoint, list, data) => {
  await list.forEach((id) => {
    axios.patch(`${endpoint}/${id}`, data);
  });
}; // thêm data

export const deleteData = async (endpoint, id = '') => {
  await axios.delete(`${endpoint}/${id}`);
}; // thêm data

export const deleteMultiData = async (endpoint, list) => {
  await list.forEach((id) => {
    axios.delete(`${endpoint}/${id}`);
  });
}; // thêm data
