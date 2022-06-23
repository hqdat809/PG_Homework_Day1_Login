import { ITableItem } from 'models/table';
export const LS_LANG = 'lang';

export const GENDER_OPTIONS = [
  {
    value: 'male',
    label: 'Nam',
  },
  {
    value: 'female',
    label: 'Nữ',
  },
  {
    value: 'other',
    label: 'Khác',
  },
];

export const STATUS_NAME = {
  RECEIVED: 'Received',
  PROCESSING: 'Processing',
  FULFILLED: 'Fulfiled',
  CANCELLED: 'Cancelled',
  PENDING: 'Pending',
};

export const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: STATUS_NAME.RECEIVED, label: STATUS_NAME.RECEIVED },
  { value: STATUS_NAME.PROCESSING, label: STATUS_NAME.PROCESSING },
  { value: STATUS_NAME.FULFILLED, label: STATUS_NAME.FULFILLED },
  { value: STATUS_NAME.CANCELLED, label: STATUS_NAME.CANCELLED },
  { value: STATUS_NAME.PENDING, label: STATUS_NAME.PENDING },
];

export const currencyFormat = (currency: number) => {
  return currency.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatColorStatus = (item: string) => {
  if (item === STATUS_NAME.CANCELLED) {
    return 'orange';
  }
  if (item === STATUS_NAME.FULFILLED) {
    return 'green';
  }
  if (item === STATUS_NAME.PENDING) {
    return 'red';
  }
  if (item === STATUS_NAME.PROCESSING) {
    return 'yellow';
  }
  if (item === STATUS_NAME.RECEIVED) {
    return 'blue';
  }
};
