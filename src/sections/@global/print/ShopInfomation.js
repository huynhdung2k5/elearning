// ----------------------------------------------------------------------
// Thông tin cửa hàng trong mẫu in
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// mui
import { Typography } from '@mui/material';
import { useGetDocument } from '../../../lib/firebase/service';

// ----------------------------------------------------------------------

ShopInfomation.propTypes = {
  title: PropTypes.string,
}; // proptypes

export default function ShopInfomation({ title }) {
  const infomation = useGetDocument('infomation');

  return (
    <>
      <Typography fontWeight={700} variant="h6" textAlign="center">
        {infomation[0]?.name || 'CÀ PHÊ GD VIỆT NAM'}
      </Typography>

      <Typography variant="body2" textAlign="center" fontStyle="italic">
        {infomation[0]?.address ||
          'Địa chỉ : A1-48 đường số 5, KDC Nam Long, quận Cái Răng, thành phố Cần Thơ.'}
      </Typography>

      <Typography variant="body2" textAlign="center">
        {infomation[0]?.phoneNumber || 'Hotline : 0946.136.648 - 0946.888.478'}
      </Typography>

      <Typography fontWeight={700} variant="h4" textAlign="center" textTransform="uppercase">
        {title}
      </Typography>
    </>
  );
}
