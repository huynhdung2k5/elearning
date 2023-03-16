// ----------------------------------------------------------------------
// Trang đăng nhập
// ----------------------------------------------------------------------
// next
import NextLink from 'next/link';
// @mui
import { Box, Link, Stack, Typography } from '@mui/material';
// components
import Label from '../../components/label';
// child components
import AuthLoginForm from './AuthLoginForm';
// layout
import AuthLayout from '../../layouts/auth/AuthLayout';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <AuthLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Box>
          <Label
            color="secondary"
            variant="filled"
            sx={{
              paddingX: 3,
              paddingY: 2,
            }}
          >
            <Typography variant="">ĐĂNG NHẬP HỆ THỐNG</Typography>
          </Label>
        </Box>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Bạn cần hỗ trợ ?</Typography>

          <Link component={NextLink} href="https://gdvietnam.com" variant="subtitle2" color="blue">
            Liên hệ GD Việt Nam.
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />
    </AuthLayout>
  );
}
