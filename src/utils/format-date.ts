import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants/date';

export const formatDate = (date: string) => {
	if (date) {
		return dayjs(date).format(DATE_FORMAT);
	}
	return '';
};
