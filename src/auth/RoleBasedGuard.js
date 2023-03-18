import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// lodash
import _ from 'lodash';
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
  role: PropTypes.bool,
  permission: PropTypes.string,
  permissions: PropTypes.array,
};

// ----------------------------------------------------------------------

const AccessDenied = (
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
);

export default function RoleBasedGuard({ hasContent, role, permission, permissions, children }) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  const userPermissions = user?.role?.permissions?.map((perm) => perm.name); // lấy ra permissions của user

  const intersection = _.intersection(permissions, userPermissions); // so sánh permission có trong userPermissions không

  if (typeof permission !== 'undefined' && !userPermissions.includes(permission)) {
    return hasContent ? AccessDenied : null;
  }
  if (typeof permissions !== 'undefined' && !intersection.length > 0) {
    return hasContent ? AccessDenied : null;
  }
  return <> {children} </>;
}
