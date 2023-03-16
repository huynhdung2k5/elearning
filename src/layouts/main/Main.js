// ----------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------
import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../config-global';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

const SPACING = 8;
// @type
Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext(); // theme

  const isNavHorizontal = themeLayout === 'horizontal'; // nav horizontal

  const isNavMini = themeLayout === 'mini'; // mini size

  const isDesktop = useResponsive('up', 'lg'); // check desktop

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER.H_MAIN_DESKTOP + 80}px`,
            pb: `${HEADER.H_MAIN_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          py: `${HEADER.H_MAIN_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_MAIN}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MAIN_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
