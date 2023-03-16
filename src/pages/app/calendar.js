// ----------------------------------------------------------------------
// Trang lịch làm việc
// ----------------------------------------------------------------------
// next
import Head from 'next/head';
// react
import { useEffect, useRef, useState } from 'react';
// calender react
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
// @mui
import { Button, Card, Container, Dialog, DialogTitle } from '@mui/material';
// redux
import {
  createEvent,
  deleteEvent,
  getEvents,
  onCloseModal,
  onOpenModal,
  selectEvent,
  selectRange,
  updateEvent,
} from '../../redux/slices/calendarStateSlice';
import { dispatch, useSelector } from '../../redux/store';
// routes
import { PATH_ROOTS } from '../../routes/paths';
// utils
import { fTimestamp } from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// layouts
import MainLayout from '../../layouts/main';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useDateRangePicker } from '../../components/date-range-picker';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { useSnackbar } from '../../components/snackbar';
// sections
import {
  CalendarFilterDrawer,
  CalendarForm,
  CalendarToolbar,
  StyledCalendar,
} from '../../sections/app/calendar';
// firebase
import { useGetDocument } from '../../lib/firebase/service';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const viLocale = {
  code: 'vi',
  buttonText: {
    prev: 'Trước',
    next: 'Sau',
    today: 'Hôm nay',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    list: 'Lịch biểu',
  },
  allDayText: 'Cả ngày',
};

// ----------------------------------------------------------------------

CalendarPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function CalendarPage() {
  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const { themeStretch } = useSettingsContext(); // theme setting

  const calendar = useGetDocument('calendar'); // lấy dữ liệu từ slice redux

  useEffect(() => {
    dispatch(getEvents(calendar || []));
  }, [dispatch, calendar]); // lấy dữ liệu bằng dispatch

  const isDesktop = useResponsive('up', 'sm'); // kiểm tra desktop

  const calendarRef = useRef(null); // calendar ref

  const { events, openModal, selectedRange, selectedEventId } = useSelector(
    (state) => state.calendarState
  ); // các phần tử của calendar State Slice

  const selectedEvent = useSelector(() => {
    if (selectedEventId) {
      return events.find((event) => event.id === selectedEventId);
    }

    return null;
  }); // chọn sự kiện

  const picker = useDateRangePicker(null, null); // chọn ngày

  const [date, setDate] = useState(new Date()); // state chọn ngày

  const [openFilter, setOpenFilter] = useState(false); // state đóng mở filter

  const [filterEventColor, setFilterEventColor] = useState([]); // state chọn màu filter

  const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek'); // chọn view của calendar

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]); // thay đổi hiển thị của calendar theo giao diện

  const handleOpenFilter = () => {
    setOpenFilter(true);
  }; // handle mở menu filter

  const handleCloseFilter = () => {
    setOpenFilter(false);
  }; // handle đóng menu filter

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }; // Chọn ngày hôm nay

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  }; // Đổi cách hiển thị

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }; // Chọn ngày trước đó

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }; // Chọn ngày sau đó

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(
      selectRange({
        start: arg.start,
        end: arg.end,
      })
    );
  }; // chọn ngày theo range

  const handleSelectEvent = (arg) => {
    dispatch(selectEvent(arg.event.id));
  }; // chọn sự kiện

  const handleResizeEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }; // handle thay đổi sự kiện

  const handleDropEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }; // handle thêm sự kiện

  const handleOpenModal = () => {
    dispatch(onOpenModal());
  }; // handle mở menu modal sự kiện

  const handleCloseModal = () => {
    dispatch(onCloseModal());
  }; // handle đóng menu modal sự kiện

  const handleCreateUpdateEvent = (newEvent) => {
    if (selectedEventId) {
      dispatch(updateEvent(selectedEventId, newEvent));
      enqueueSnackbar('Cập nhật thành công !');
    } else {
      dispatch(createEvent(newEvent));
      enqueueSnackbar('Tạo mới thành công !');
    }
  }; // handle thêm mới/cập nhật sự kiện

  const handleDeleteEvent = async () => {
    try {
      if (selectedEventId) {
        dispatch(deleteEvent(selectedEventId));
        handleCloseModal();
        enqueueSnackbar('Xóa thành công !');
      }
    } catch (error) {
      console.error(error);
    }
  }; // handle xóa sự kiện

  const handleFilterEventColor = (eventColor) => {
    const checked = filterEventColor.includes(eventColor)
      ? filterEventColor.filter((value) => value !== eventColor)
      : [...filterEventColor, eventColor];

    setFilterEventColor(checked);
  }; // handle chọn màu sắc sự kiện

  const dataFiltered = applyFilter({
    inputData: events,
    filterEventColor,
    filterStartDate: picker.startDate,
    filterEndDate: picker.endDate,
    isError: !!picker.isError,
  }); // proptype

  return (
    <>
      <Head>
        <title>Lịch làm việc</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Lịch làm việc & ghi chú"
          links={[
            { name: 'Ứng dụng', href: PATH_ROOTS.root },
            {
              name: 'Lịch',
              href: PATH_ROOTS.bills.list,
            },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenModal}
            >
              Thêm ghi chú
            </Button>
          }
        />

        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
              onOpenFilter={handleOpenFilter}
            />

            <FullCalendar
              weekends
              editable
              droppable
              selectable
              allDayMaintainDuration
              eventResizableFromStart
              events={dataFiltered}
              initialEvents={events}
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isDesktop ? 720 : 'auto'}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
              locale={viLocale}
            />
          </StyledCalendar>
        </Card>
      </Container>

      <Dialog fullWidth maxWidth="xs" open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedEvent ? 'Chỉnh sửa' : 'Thêm mới'}</DialogTitle>

        <CalendarForm
          event={selectedEvent}
          range={selectedRange}
          onCancel={handleCloseModal}
          onCreateUpdateEvent={handleCreateUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          colorOptions={COLOR_OPTIONS}
        />
      </Dialog>

      <CalendarFilterDrawer
        events={events}
        picker={picker}
        open={openFilter}
        onClose={handleCloseFilter}
        colorOptions={COLOR_OPTIONS}
        filterEventColor={filterEventColor}
        onFilterEventColor={handleFilterEventColor}
        onResetFilter={() => {
          const { setStartDate, setEndDate } = picker;
          setFilterEventColor([]);
          if (setStartDate && setEndDate) {
            setStartDate(null);
            setEndDate(null);
          }
        }}
        onSelectEvent={(eventId) => {
          if (eventId) {
            handleOpenModal();
            dispatch(selectEvent(eventId));
          }
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filterEventColor, filterStartDate, filterEndDate, isError }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]); // filter chuỗi của sự kiện

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterEventColor.length) {
    inputData = inputData.filter((event) => filterEventColor.includes(event.textColor));
  } // filter sự kiện theo màu sắc

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (event) =>
        fTimestamp(event.start) >= fTimestamp(filterStartDate) &&
        fTimestamp(event.end) <= fTimestamp(filterEndDate)
    );
  } // filter sự kiện theo ngày bắt đầu / kết thúc

  return inputData;
}
