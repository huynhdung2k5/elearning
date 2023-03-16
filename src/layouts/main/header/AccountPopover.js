// ----------------------------------------------------------------------
// Thông tin user
// ----------------------------------------------------------------------
// react
import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { IconButtonAnimate } from '../../../components/animate';
import { CustomAvatar } from '../../../components/custom-avatar';
import MenuPopover from '../../../components/menu-popover';
import { useSnackbar } from '../../../components/snackbar';
// locales
import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { replace, push } = useRouter(); // routers

  const { user, logout } = useAuthContext(); // auth

  const { translate } = useLocales(); // locales

  const { enqueueSnackbar } = useSnackbar(); // snackbar

  const [openPopover, setOpenPopover] = useState(null); // state menu popover

  const OPTIONS = [
    {
      label: translate('account.homepage'),
      linkTo: '/',
    },
    {
      label: translate('account.change password'),
      linkTo: '/settings/user/',
    },
  ]; // user options

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  }; // mở popover

  const handleClosePopover = () => {
    setOpenPopover(null);
  }; // đóng popover

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Không thể đăng xuất !', { variant: 'error' });
    }
  }; // đăng xuất

  const handleClickItem = (path) => {
    handleClosePopover();
    push(path);
  }; // link tới trang đích

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src="/assets/images/users/user.png"
          alt={user?.fullName}
          name={user?.fullName}
        />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.profile.fullName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.role.name}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {translate('account.logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
