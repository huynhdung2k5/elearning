import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, src, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img"
      sx={{
        width: src ? '40%' : 40,
        height: src ? 'auto' : 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
      alt="GD Việt Nam"
      src={src || '/favicon/favicon.png'}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
};

export default Logo;
