// mui
import { Box, CircularProgress, Stack } from '@mui/material';
// framer-motion
import { m } from 'framer-motion';

export default function LoadingData() {
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress color="primary" />

      <Box
        component={m.div}
        animate={{
          opacity: [1, 0.5, 0.5, 0.5, 1],
        }}
        transition={{
          ease: 'linear',
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Dữ liệu đang tải vui lòng đợi...
      </Box>
    </Stack>
  );
}
