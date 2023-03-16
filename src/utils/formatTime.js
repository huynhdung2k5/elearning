// ----------------------------------------------------------------------
// Format thời gian
// ----------------------------------------------------------------------

// dayjs
import { format, fromUnixTime, getTime } from 'date-fns';
import sub from 'date-fns/sub';
// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'HH:mm dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fCurrentDate(date, newFormat) {
  const fm = newFormat || 'dd-MM-yyyy';
  return date ? format(date, fm) : '';
}

export function fDateSubtract(date, newFormat, value) {
  const fm = newFormat || 'dd-MM-yyyy';

  const result = sub(date, value);
  return result ? format(result, fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  if (date?.seconds !== undefined) {
    const dateTimestamp = fromUnixTime(date?.seconds);

    return date ? format(dateTimestamp, fm) : '';
  }

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date, newFormat) {
  const fm = newFormat || 'dd-MM-yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTimeCalendar(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDatePicker(date) {
  return date ? new Date(date.seconds * 1000) : '';
}
