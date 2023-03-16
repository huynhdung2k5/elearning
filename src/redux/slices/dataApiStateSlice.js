// ----------------------------------------------------------------------
// State xử lý Api
// ----------------------------------------------------------------------
// redux
import { createSlice } from '@reduxjs/toolkit';
// firebase
import {
  addDocument,
  deleteDocument,
  deleteDocuments,
  getDocuments,
  updateDocument,
} from '../../lib/firebase/service';

// utils
// import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  table: [],
  menu: [],
  category: [],
  delivery: [],
  voucher: [],
  staff: [],
  bills: [],
  warehouse: [],
  funds: [],
  infomation: [],
  calendar: [],
  user: [],
  notifications: [],
}; // giá trị mặc định

const slice = createSlice({
  name: 'dataApiState',
  initialState,
  reducers: {
    // trạng thái chờ loading
    startLoading(state) {
      state.isLoading = true;
    },

    // có lỗi xảy ra
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // lấy data thành công
    getDataSuccess(state, action) {
      state.isLoading = false;

      state[action.payload.collection] = action.payload.response;
    },

    // thêm dữ liệu data
    addDataSuccess(state, action) {
      state.isLoading = false;

      state[action.payload.collection] = action.payload.response;
    },

    // cập nhật dữ liệu thành công
    updateDataSuccess(state, action) {
      state.isLoading = false;

      state[action.payload.collection] = action.payload.response;
    },

    // Xoá dữ liệu thành công
    deleteDataSuccess(state, action) {
      state.isLoading = false;

      const CollectionId = action.payload.id;

      state[action.payload.collection] = state[action.payload.collection].filter(
        (collection) => collection.id !== CollectionId
      );
    },

    // Xoá dữ liệu thành công
    deleteMultiDataSuccess(state, action) {
      state.isLoading = false;

      const CollectionListId = action.payload.listId;

      state[action.payload.collection] = state[action.payload.collection].filter(
        (collection) => !CollectionListId.includes(collection.id)
      );
    },
    // set state
    setStateData(state, action) {
      state.table = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, setStateData } = slice.actions;

// ----------------------------------------------------------------------

export function getDataFromApi(collection) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading()); // loading
    try {
      const response = await getDocuments(collection); // lấy dữ liệu từ firebase

      dispatch(slice.actions.getDataSuccess({ response, collection })); // dispatch
    } catch (error) {
      dispatch(slice.actions.hasError(error)); // check lỗi
    }
  };
} // lấy dữ liệu từ Api

export function addData(collection, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading()); // loading
    try {
      await addDocument(collection, data); // thêm data vào firebase

      const response = await getDocuments(collection); // lấy dữ liệu từ firebase

      dispatch(slice.actions.addDataSuccess({ collection, response })); // dispatch
    } catch (error) {
      dispatch(slice.actions.hasError(error)); // check lỗi
    }
  };
} // add data

export function updateData(collection, id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading()); // loading
    try {
      await updateDocument(collection, id, data); // thêm data vào firebase

      const response = await getDocuments(collection); // lấy dữ liệu từ firebase

      dispatch(slice.actions.updateDataSuccess({ collection, response })); // dispatch
    } catch (error) {
      dispatch(slice.actions.hasError(error)); // check lỗi
    }
  };
} // add data

export function deleteData(collection, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading()); // loading
    try {
      await deleteDocument(collection, id); // lấy dữ liệu từ firebase

      dispatch(slice.actions.deleteDataSuccess({ collection, id })); // dispatch
    } catch (error) {
      dispatch(slice.actions.hasError(error)); // check lỗi
    }
  };
} // xoá 1 dữ liệu

export function deleteMultiData(collection, listId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading()); // loading
    try {
      await deleteDocuments(collection, listId); // lấy dữ liệu từ firebase

      dispatch(slice.actions.deleteMultiDataSuccess({ collection, listId })); // dispatch
    } catch (error) {
      dispatch(slice.actions.hasError(error)); // check lỗi
    }
  };
} // xoá nhiều dữ liệu cùng lúc

// export function getDataFromApi(endpoint) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(`${endpoint}`);
//       dispatch(slice.actions.getDatasSuccess(response.data.products));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
