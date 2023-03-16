import { useState } from 'react';
import { isSameDay, isSameMonth, getYear, isBefore } from 'date-fns';
// utils
import { fDateTimeCalendar } from '../../utils/formatTime';

// ----------------------------------------------------------------------

export default function useDateRangePicker(start, end) {
  const [open, setOpen] = useState(false);

  const [endDate, setEndDate] = useState(end);

  const [startDate, setStartDate] = useState(start);

  const isError =
    (startDate && endDate && isBefore(new Date(endDate), new Date(startDate))) || false;

  const currentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const isCurrentYear = currentYear === startDateYear && currentYear === endDateYear;

  const isSameDays =
    startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false;

  const isSameMonths =
    startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false;

  const standardLabel = `${fDateTimeCalendar(startDate)} - ${fDateTimeCalendar(endDate)}`;

  const getShortLabel = () => {
    if (isCurrentYear) {
      if (isSameMonths) {
        if (isSameDays) {
          return fDateTimeCalendar(endDate, 'dd MMM yy');
        }
        return `${fDateTimeCalendar(startDate, 'dd')} - ${fDateTimeCalendar(endDate, 'dd MMM yy')}`;
      }
      return `${fDateTimeCalendar(startDate, 'dd MMM')} - ${fDateTimeCalendar(
        endDate,
        'dd MMM yy'
      )}`;
    }
    return `${fDateTimeCalendar(startDate, 'dd MMM yy')} - ${fDateTimeCalendar(
      endDate,
      'dd MMM yy'
    )}`;
  };

  const onChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const onChangeEndDate = (newValue) => {
    if (isError) {
      setEndDate(null);
    }
    setEndDate(newValue);
  };

  const onReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onReset,
    //
    isSelected: !!startDate && !!endDate,
    isError,
    //
    label: standardLabel || '',
    shortLabel: getShortLabel() || '',
    //
    setStartDate,
    setEndDate,
  };
}
