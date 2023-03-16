// ----------------------------------------------------------------------
// Liên hệ
// ----------------------------------------------------------------------
// react & next
import { useState } from 'react';
// @mui
import { ListItemAvatar, ListItemText, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import { IconButtonAnimate } from '../../../components/animate';
import { CustomAvatar } from '../../../components/custom-avatar';
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import MenuPopover from '../../../components/menu-popover';
import Scrollbar from '../../../components/scrollbar';
// firebase
import { useGetDocument } from '../../../lib/firebase/service';
// locales
import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64; // chiều cao item

export default function ContactsPopover() {
  const [openPopover, setOpenPopover] = useState(null); // state đóng mở popover

  const { translate } = useLocales(); // locales

  const staff = useGetDocument('staff');

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  }; // mở popover

  const handleClosePopover = () => {
    setOpenPopover(null);
  }; // đóng popover

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 320 }}>
        <Typography variant="h6" sx={{ p: 1.5 }}>
          {translate('contact.contact staff')}{' '}
          <Typography component="span">({staff.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {staff?.map((contact) => (
            <MenuItem key={contact.id} sx={{ height: ITEM_HEIGHT }}>
              <ListItemAvatar>
                <CustomAvatar src={contact.photoURL || '/assets/images/staff.png'} />
              </ListItemAvatar>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <ListItemText
                  primary={contact.name}
                  secondary={contact.phoneNumber}
                  primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                />

                <Label variant="soft" sx={{ textTransform: 'capitalize' }}>
                  {contact.position}
                </Label>
              </Stack>
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
