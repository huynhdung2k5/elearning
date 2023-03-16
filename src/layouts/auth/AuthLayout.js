// ----------------------------------------------------------------------
// Layout của trang Login
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
import Label from '../../components/label/Label';
// child components
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
}; // proptype

export default function AuthLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          width: '100px',
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
        src="/logo/logo_full.png"
      />

      <StyledSection>
        <Typography variant="h2" sx={{ mb: 3, maxWidth: 480, textAlign: 'center', color: 'blue' }}>
          {title || 'GD VIỆT NAM'}
        </Typography>

        <Box>
          <Label
            color="warning"
            variant="filled"
            sx={{
              paddingX: 5,
              paddingY: 3,
              borderRadius: 32,
            }}
          >
            <Typography variant="h5">PHẦN MỀM HỌC TRỰC TUYẾN</Typography>
          </Label>
        </Box>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/login.png'}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>

      <Typography
        variant="subtitle1"
        sx={{
          left: 15,
          bottom: 9,
          zIndex: 9,
          position: 'absolute',
        }}
      >
        Bản quyền GD Việt Nam © 2023
      </Typography>
    </StyledRoot>
  );
}
