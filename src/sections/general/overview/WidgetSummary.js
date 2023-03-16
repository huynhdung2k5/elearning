// ----------------------------------------------------------------------
// Card summary danh mục tổng quan
// ----------------------------------------------------------------------
// proptype
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import Chart from '../../../components/chart';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

WidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.any,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  average: PropTypes.string,
}; // proptype

export default function WidgetSummary({
  title,
  icon,
  iconColor,
  total,
  chart,
  average,
  sx,
  ...other
}) {
  const { colors, series, options } = chart; // lấy dữ liệu của chart

  const chartOptions = {
    colors,
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '68%',
        borderRadius: 2,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
    ...options,
  }; // chart options

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
          <Iconify
            icon={icon}
            sx={{
              mr: 1,
              p: 0.5,
              width: 24,
              height: 24,
              borderRadius: '50%',
              color: iconColor,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
            }}
          />

          <Typography component="div" variant="subtitle2">
            {average}
          </Typography>
        </Stack>

        <Typography variant="h4">{total}</Typography>
      </Box>

      <Chart type="bar" series={[{ data: series }]} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
