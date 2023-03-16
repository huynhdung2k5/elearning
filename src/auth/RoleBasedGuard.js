import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  // const currentRole = 'user';
  const currentRole = user?.role?.name; // admin;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={{
          marginTop: 15,
          textAlign: 'center',
        }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Quyền truy cập bị từ chối
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Bạn không có quyền truy cập để xem nội dung này
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
