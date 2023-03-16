// ----------------------------------------------------------------------
// state xử lý đặt món / cập nhật món
// ----------------------------------------------------------------------
// redux
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  dishState: [],
}; // giá trị mặc định

const dishStateSlice = createSlice({
  name: 'dishState',
  initialState,
  reducers: {
    getDish(state, action) {
      state.dishState = action.payload?.map((item) => ({
        id: item?.id,
        name: item?.name,
        price: item?.price,
        unit: item?.unit,
        photoURL: item?.photoURL,
        quantity: item?.quantity || 0,
        totalPrice: item?.totalPrice || 0,
      }));
    }, // lấy dữ liệu danh sách món

    decreaseQuantity(state, action) {
      const dishId = action.payload;
      const updateDish = state.dishState.map((dish) => {
        if (dish.id === dishId) {
          return {
            ...dish,
            quantity: dish.quantity - 1,
            totalPrice: (dish.quantity - 1) * dish.price,
          };
        }
        return dish;
      });
      state.dishState = updateDish;
    }, // xử lý giảm số lượng

    increaseQuantity(state, action) {
      const dishId = action.payload;
      const updateDish = state.dishState.map((dish) => {
        if (dish.id === dishId) {
          return {
            ...dish,
            quantity: dish.quantity + 1,
            totalPrice: (dish.quantity + 1) * dish.price,
          };
        }
        return dish;
      });
      state.dishState = updateDish;
    }, // xử lý tăng số lượng
  },
});

// Reducer
export default dishStateSlice.reducer;

// Actions
export const { getDish, increaseQuantity, decreaseQuantity } = dishStateSlice.actions;
