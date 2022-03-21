import moment from 'moment';

const delay = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const formatNumber = (value) => {
  const fm = new Intl.NumberFormat();
  return fm.format(value);
}

const weekInitialState = {data: [], avg: 0};

const detailInitialState = {
  day: [],
  dayAvg: 0,
  hour: [],
  hourAvg: 0,
};

const parseDate = (str: string) => {
  return moment(str).format('DD/MM');
}

const today = moment().format('YYYY-MM-DD');

export {
  delay,
  formatNumber,
  weekInitialState,
  detailInitialState,
  parseDate,
  today,
};
