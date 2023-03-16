// ----------------------------------------------------------------------
// Form nhập dữ liệu event
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// lodash
import merge from 'lodash/merge';
// date-fns
import { isBefore } from 'date-fns';
// form & yup
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../components/iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
  const initialEvent = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start).toISOString() : new Date().toISOString(),
    end: range ? new Date(range.end).toISOString() : new Date().toISOString(),
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
}; // lấy giá trị mặc định

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onCreateUpdateEvent: PropTypes.func,
  colorOptions: PropTypes.arrayOf(PropTypes.string),
}; // proptype

export default function CalendarForm({
  event,
  range,
  colorOptions,
  onCreateUpdateEvent,
  onDeleteEvent,
  onCancel,
}) {
  const hasEventData = !!event; // lấy dữ liệu sự kiện đã có từ trước

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Vui lòng nhập tiêu đề !'),
    description: Yup.string().max(5000),
  }); // validate form

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  }); // lấy các method của form

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods; // các method của form

  const values = watch(); // dữ liệu form

  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: new Date(data.start).toISOString(),
        end: new Date(data.end).toISOString(),
      };
      onCreateUpdateEvent(newEvent);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  }; // submit form

  const isDateError =
    !values.allDay && values.start && values.end
      ? isBefore(new Date(values.end), new Date(values.start))
      : false; // check ngày không hợp lệ

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Tiêu đề..." />

        <RHFTextField name="description" label="Mô tả..." multiline rows={3} />

        <RHFSwitch name="allDay" label="Cả ngày" />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              label="Ngày bắt đầu"
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              label="Ngày kết thúc"
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && 'Ngày kết thúc phải trễ hơn ngày bắt đầu !'}
                />
              )}
            />
          )}
        />

        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <ColorSinglePicker
              value={field.value}
              onChange={field.onChange}
              colors={colorOptions}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {hasEventData && (
          <Tooltip title="Xóa sự kiện">
            <IconButton onClick={onDeleteEvent}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Hủy
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {hasEventData ? 'Cập nhật' : 'Thêm mới'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
