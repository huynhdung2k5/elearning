// ----------------------------------------------------------------------
// Form để thêm/cập nhật
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// react
import { useEffect, useMemo } from 'react';
// lodash
import _ from 'lodash';
// form & yup
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Divider, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
// path
import { PATH_ROOTS } from '../../../routes/paths';
// components
import FormProvider, { RHFMultiCheckbox, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
// api
import { addData, updateData } from '../../../api/service/crud-service';

// ----------------------------------------------------------------------

RolesForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.any,
  groupPermissions: PropTypes.array,
}; // proptype

// ----------------------------------------------------------------------

export default function RolesForm({ isEdit, currentProduct, groupPermissions }) {
  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const { push } = useRouter(); // router

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên của quyền truy cập'),
    description: Yup.string().required('Vui lòng nhập mô tả quyền truy cập'),
  }); // validate dữ liệu form

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      permissionIds: _.map(currentProduct?.permissions, 'id') || [],
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
    setValue,
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

      if (isEdit) {
        updateData('roles', currentProduct?.id, data);
      } else {
        addData('roles', data);
      }

      reset();
      enqueueSnackbar(!isEdit ? 'Tạo mới thành công !' : 'Cập nhật thành công !');
      push(PATH_ROOTS.roles.list);
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Đã có lỗi xảy ra !', { variant: 'error' });
    }
  }; // xử lý submit form

  const handleChangeCheckAll = (event, permissionIds) => {
    if (event.target.checked) {
      setValue('permissionIds', _.concat(values.permissionIds, permissionIds));
    } else {
      setValue('permissionIds', _.difference(values.permissionIds, permissionIds));
    }
  };

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
                <RHFTextField multiline rows={2} size="small" name="name" label="Tên vai trò..." />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <Stack spacing={1} p={3}>
                <Typography>
                  Mô tả : <span style={{ color: 'red' }}>*</span>
                </Typography>
                <RHFTextField
                  multiline
                  rows={2}
                  size="small"
                  name="description"
                  label="Mô tả thông tin quyền..."
                />
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography p={2} fontWeight={700}>
              CHỌN TÍNH NĂNG ĐƯỢC SỬ DỤNG : <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>

          {groupPermissions?.map((role, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <Typography p={2}>{role.name}</Typography>

                <Divider />

                <Stack p={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={_.every(_.map(role.permissions, 'id'), (item) =>
                          _.includes(values.permissionIds, item)
                        )}
                        onChange={(event) =>
                          handleChangeCheckAll(event, _.map(role.permissions, 'id'))
                        }
                      />
                    }
                    label={
                      <Typography variant="subtitle2" fontWeight={700}>
                        CHỌN TẤT CẢ
                      </Typography>
                    }
                  />

                  <RHFMultiCheckbox
                    name="permissionIds"
                    options={role.permissions.map((permission) => ({
                      value: permission.id,
                      label: permission.description,
                    }))}
                  />
                </Stack>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Card sx={{ p: 3, width: 'max-content' }}>
              <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'TẠO VAI TRÒ MỚI' : 'CẬP NHẬT THAY ĐỔI'}
              </LoadingButton>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
