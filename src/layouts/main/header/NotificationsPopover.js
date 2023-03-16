// ----------------------------------------------------------------------
// Thông báo
// ----------------------------------------------------------------------
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// locales
import { useLocales } from '../../../locales';
// components
import { IconButtonAnimate } from '../../../components/animate';
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import Scrollbar from '../../../components/scrollbar';
import { useSnackbar } from '../../../components/snackbar';
// firebase
import {
  deleteDocuments,
  updateAllDocument,
  updateDocument,
  useGetDocument,
} from '../../../lib/firebase/service';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState(null); // state đóng mở thông báo

  const { enqueueSnackbar } = useSnackbar(); // snackbar thông báo

  const { translate } = useLocales(); // locales

  const notifications = useGetDocument('notifications'); // danh sách thông báo

  const [openConfirm, setOpenConfirm] = useState(false); // state đóng mở confirm

  const totalRead = notifications.filter((obj) => obj.read === true).reverse(); // tổng thông báo đã đọc

  const totalUnRead = notifications.filter((obj) => obj.read === false).reverse(); // tổng thông báo chưa đọc

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  }; // mở popover

  const handleClosePopover = () => {
    setOpenPopover(null);
  }; // đóng popover

  const handleMarkAllAsRead = () => {
    const list = notifications?.map((data) => data.id);

    updateAllDocument('notifications', list, {
      read: true,
    });

    enqueueSnackbar('Đánh dấu tất cả đã đọc !');
  }; // đánh dấu tất cả là đã đọc

  const handleDeleteNotifications = () => {
    const list = notifications?.map((data) => data.id);

    deleteDocuments('notifications', list);
    setOpenConfirm(false);
    handleClosePopover();

    if (list.length > 0) {
      enqueueSnackbar('Đã xóa thành công !');
    } else {
      enqueueSnackbar('Không có thông báo !', { variant: 'error' });
    }
  }; // xóa tất cả thông báo

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead.length} showZero color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{translate('notification.notification')}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translate('notification.you have')} {totalUnRead.length}{' '}
              {translate('notification.new')}
            </Typography>
          </Box>

          {totalUnRead.length > 0 && (
            <Tooltip title={translate('notification.mark as read')}>
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 640 } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {translate('notification.new')}
              </ListSubheader>
            }
          >
            {totalUnRead.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {translate('notification.read')}
              </ListSubheader>
            }
          >
            {totalRead.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple color="error" onClick={() => setOpenConfirm(true)}>
            {translate('notification.delete all')}
          </Button>
        </Box>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title={translate('notification.confirm')}
        content={translate('notification.confirm delete')}
        action={
          <Button variant="contained" color="error" onClick={handleDeleteNotifications}>
            {translate('notification.delete')}
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.object,
};

function NotificationItem({ notification }) {
  const handleRead = (id) => {
    updateDocument('notifications', id, {
      read: true,
    });
  };

  return (
    <Scrollbar>
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(!notification.read && {
            bgcolor: 'action.selected',
          }),
        }}
        onClick={() => handleRead(notification.id)}
      >
        <ListItemText
          disableTypography
          primary={<Typography variant="subtitle2">{notification?.notification}</Typography>}
          secondary={
            <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
              <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
              <Typography variant="caption">{fDate(notification.createdAt)}</Typography>
            </Stack>
          }
        />
      </ListItemButton>
    </Scrollbar>
  );
}
