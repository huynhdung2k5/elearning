// ----------------------------------------------------------------------
// Hướng dẫn
// ----------------------------------------------------------------------
// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// locales
import { useLocales } from '../../../locales';
// routes

// ----------------------------------------------------------------------

export default function NavDocs() {
  const { user } = useAuthContext(); // auth context

  const { translate } = useLocales(); // locales

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        py: 5,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Box component="img" src="/assets/illustrations/login.png" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate('docs.hi')}, ${user?.profile.fullName}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {`${translate('docs.description')}`}
        </Typography>
      </div>

      <Button href="https://gdvietnam.com" target="_blank" rel="noopener" variant="contained">
        {`${translate('docs.documentation')}`}
      </Button>
    </Stack>
  );
}
