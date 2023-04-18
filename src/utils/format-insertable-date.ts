import dayjs, { Dayjs } from 'dayjs';

export const formatInsertableDate = (date: Dayjs | string) => {
	return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.000Z');
};
