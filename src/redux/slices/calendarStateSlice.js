// ----------------------------------------------------------------------
// State xử lý lịch & sự kiện ghi chú
// ----------------------------------------------------------------------
// redux
import { createSlice } from '@reduxjs/toolkit';
// firebase
import { addDocument, deleteDocument, updateDocument } from '../../lib/firebase/service';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  events: [],
  openModal: false,
  selectedEventId: null,
  selectedRange: null,
}; // giá trị mặc định

const calendarStateSlice = createSlice({
  name: 'calendarState',
  initialState,
  reducers: {
    // trạng thái chờ loading
    startLoading(state) {
      state.isLoading = true;
    },

    // có lỗi xảy ra khi call api
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Mở modal thêm/cập nhật lịch
    onOpenModal(state) {
      state.openModal = true;
    },

    // Đóng modal thêm/cập nhật lịch
    onCloseModal(state) {
      state.openModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },

    // lựa chọn event
    selectEvent(state, action) {
      const eventId = action.payload;
      state.openModal = true;
      state.selectedEventId = eventId;
    },

    // lựa chọn range ngày
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.openModal = true;
      state.selectedRange = { start, end };
    },

    // Lấy danh sách sự kiện
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // Tạo sự kiện mới
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // Cập nhật sự kiện
    updateEventSuccess(state, action) {
      state.isLoading = false;
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }
        return event;
      });
    },
  },
});

// Reducer
export default calendarStateSlice.reducer;

// Actions
export const { onOpenModal, onCloseModal, selectEvent, selectRange } = calendarStateSlice.actions;

// ----------------------------------------------------------------------
// Lấy danh sách lịch & ghi chú
export function getEvents(values) {
  return async (dispatch) => {
    dispatch(calendarStateSlice.actions.startLoading());
    try {
      dispatch(calendarStateSlice.actions.getEventsSuccess(values));
    } catch (error) {
      dispatch(calendarStateSlice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// Tạo lịch & ghi chú mới
export function createEvent(newEvent) {
  return async (dispatch) => {
    dispatch(calendarStateSlice.actions.startLoading());
    try {
      await addDocument('calendar', {
        ...newEvent,
      });
      dispatch(calendarStateSlice.actions.createEventSuccess(newEvent));
    } catch (error) {
      dispatch(calendarStateSlice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// Cập nhật lịch & ghi chú
export function updateEvent(eventId, event) {
  return async (dispatch) => {
    dispatch(calendarStateSlice.actions.startLoading());
    try {
      await updateDocument('calendar', eventId, {
        ...event,
      });
      dispatch(calendarStateSlice.actions.updateEventSuccess(event));
    } catch (error) {
      dispatch(calendarStateSlice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// Xóa thông tin lịch / ghi chú
export function deleteEvent(eventId) {
  return async (dispatch) => {
    dispatch(calendarStateSlice.actions.startLoading());
    try {
      await deleteDocument('calendar', eventId);
      dispatch(calendarStateSlice.actions.deleteEventSuccess(eventId));
    } catch (error) {
      dispatch(calendarStateSlice.actions.hasError(error));
    }
  };
}
