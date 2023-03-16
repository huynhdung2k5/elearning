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
import { Card, Divider, Grid, Stack, Typography } from '@mui/material';
// components
import FormProvider, { RHFMultiCheckbox, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
// sections

// ----------------------------------------------------------------------

PermissionForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
}; // proptype

const roles = [
  {
    name: 'subject',
    label: 'Môn học',
    permissions: [
      {
        id: '35253454354335',
        name: 'SUBJECT_LIST',
        label: 'Xem danh sách môn học',
      },
      {
        id: '3463463fgfdfg',
        name: 'SUBJECT_UPDATE',
        label: 'Cập nhật môn học',
      },
      {
        id: '34645fghjfghfghhgf',
        name: 'SUBJECT_CREATE',
        label: 'Thêm môn học mới',
      },
      {
        id: 'dfsgdfg435435435',
        name: 'TEACHER_ALLOCATION',
        label: 'Phân bổ giáo viên',
      },
      {
        id: 'sdfgfdg435345',
        name: 'CLASS_ALLOCATION',
        label: 'Phân bố lớp học',
      },
    ],
  },
  {
    name: 'class',
    label: 'Lớp học',
    permissions: [
      {
        id: 'fdfgfdgdf435345435',
        name: 'CLASS_LIST',
        label: 'Xem danh sách lớp học',
      },
      {
        id: 'gfdgdf43534543',
        name: 'CLASS_UPDATE',
        label: 'Cập nhật lớp học',
      },
      {
        id: 'gfdgdfg435435',
        name: 'CLASS_CREATE',
        label: 'Thêm môn học mới',
      },
      {
        id: 'dfsgdfg43543543',
        name: 'STUDENT_ALLOCATION',
        label: 'Phân bố học sinh',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export default function PermissionForm({ isEdit, currentProduct }) {
  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên của quyền truy cập'),
    description: Yup.string().required('Vui lòng nhập mô tả quyền truy cập'),
  }); // validate dữ liệu form

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      permissionIds: currentProduct?.permissionIds || [],
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
          <Grid item xs={12} md={4}>
            <Card>
              <Stack spacing={1} p={3}>
                <Typography>
                  Tên vai trò : <span style={{ color: 'red' }}>*</span>
                </Typography>
                <RHFTextField size="small" name="name" label="Tên vai trò..." />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <Stack spacing={1} p={3}>
                <Typography>
                  Mô tả : <span style={{ color: 'red' }}>*</span>
                </Typography>
                <RHFTextField size="small" name="description" label="Mô tả thông tin quyền..." />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography p={2} fontWeight={700}>
              CHỌN TÍNH NĂNG ĐƯỢC SỬ DỤNG : <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>

          {roles.map((role, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Card>
                <Typography p={2}>{role.label}</Typography>

                <Divider />

                <Stack spacing={1} p={2}>
                  <RHFMultiCheckbox
                    name="permissionIds"
                    options={role.permissions.map((permission) => ({
                      value: permission.id,
                      label: permission.label,
                    }))}
                  />
                </Stack>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'THÊM QUYỀN TRUY CẬP' : 'LƯU THAY ĐỔI'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
