// ----------------------------------------------------------------------
// Form để thêm/cập nhật
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// react
import { useEffect, useMemo } from 'react';
// form & yup
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Divider, Grid, MenuItem, Stack, Typography } from '@mui/material';
// components
import FormProvider, {
  RHFMultiSelect,
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
// utils
import { EXAM_RULES_OPTIONS, LESSON_BRANCH } from '../../../utils/constants';

// ----------------------------------------------------------------------

SubjectForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
}; // proptype

// ----------------------------------------------------------------------

export default function SubjectForm({ isEdit, currentProduct }) {
  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên của môn học'),
    description: Yup.string().required('Vui lòng nhập mô tả môn học'),
    branch: Yup.string().required('Vui lòng chọn nhóm môn học'),
    numberOfLessons: Yup.string().required('Vui lòng nhập số tiết học'),
    examRules: Yup.string().required('Vui lòng chọn quy chế thi'),
  }); // validate dữ liệu form

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      branch: currentProduct?.branch || '',
      numberOfLessons: currentProduct?.branch || '',
      examRules: currentProduct?.examRules || [],
    }),
    [currentProduct]
  ); // giá trị mặc định của form

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  }); // lấy method từ form

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods; // lấy method từ form

  const values = watch(); // đọc dữ liệu form

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProduct]); // trả về dữ liệu mặc định form

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(data);
      reset();
      enqueueSnackbar(!isEdit ? 'Tạo mới thành công !' : 'Cập nhật thành công !');
    } catch (error) {
      enqueueSnackbar('Đã có lỗi xảy ra !', { variant: 'error' });
    }
  }; // xử lý submit form

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography p={1}>
                  Tên môn học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFTextField name="name" size="small" label="Tên môn học..." />

                <Typography p={1}>
                  Mô tả môn học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFTextField
                  multiline
                  rows={6}
                  name="description"
                  size="small"
                  label="Tên môn học..."
                />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography p={1}>
                  Số tiết học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFTextField name="numberOfLessons" size="small" label="Tên môn học..." />

                <Typography p={1}>
                  Nhóm môn học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFSelect size="small" name="branch" label="- Chọn nhóm môn học -">
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {LESSON_BRANCH.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <Typography p={1}>
                  Thiết lập quy chế thi cử : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFMultiSelect
                  chip
                  size="small"
                  checkbox
                  name="examRules"
                  label="- Chọn quy chế thi -"
                  options={EXAM_RULES_OPTIONS}
                />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'THÊM MÔN HỌC MỚI' : 'LƯU CẬP NHẬT THAY ĐỔI'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
