// ----------------------------------------------------------------------
// Form để thêm/cập nhật
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';

// react
import { useEffect, useMemo } from 'react';
// form & yup
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// components
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
// path
import { PATH_ROOTS } from '../../../routes/paths';
// api
import { addData, updateData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

SubjectForm.propTypes = {
  isEdit: PropTypes.bool,
  products: PropTypes.array,
  currentProduct: PropTypes.object,
}; // proptype

// ----------------------------------------------------------------------

export default function SubjectForm({ isEdit, products, currentProduct }) {
  const { push } = useRouter(); // router

  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên của môn học'),
    description: Yup.string().required('Vui lòng nhập mô tả môn học'),
  }); // validate dữ liệu form

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
    }),
    [currentProduct]
  ); // giá trị mặc định của form

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  }); // lấy method từ form

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods; // lấy method từ form

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
      if (isEdit) {
        updateData('subjects', currentProduct?.id, data);
      } else {
        addData('subjects', data);
      }

      reset();
      enqueueSnackbar(!isEdit ? 'Tạo mới thành công !' : 'Cập nhật thành công !');
      push(PATH_ROOTS.subject.list);
    } catch (error) {
      enqueueSnackbar('Đã có lỗi xảy ra !', { variant: 'error' });
    }
  }; // xử lý submit form

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography p={1}>
                  Tên môn học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFTextField name="name" multiline rows={2} label="Tên môn học..." />

                <Typography p={1}>
                  Mô tả môn học : <span style={{ color: 'red' }}>*</span>
                </Typography>

                <RHFTextField multiline rows={6} name="description" label="Mô tả về môn học..." />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ p: 3 }}>
              <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? 'THÊM MÔN HỌC MỚI' : 'CẬP NHẬT THAY ĐỔI'}
              </LoadingButton>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
