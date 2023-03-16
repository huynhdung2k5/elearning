import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from '../layouts/compact';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

Page404.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Head>
        <title> Trang không tìm thấy</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Không thể tìm thấy trang
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Xin lỗi ! Trang bạn đang truy cập không đúng, vui lòng kiểm tra lại đường dẫn URL.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={NextLink} href="/" variant="contained">
          QUAY VỀ TRANG CHỦ
        </Button>
      </MotionContainer>
    </>
  );
}
