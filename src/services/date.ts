import dayjs from 'dayjs';
import { DAY_LABEL_FORMAT, MONTH_LABEL_FORMAT } from '../constants/date';

export class DateService {
	public static getCurrentMonth() {
		return dayjs().format('YYYY-MM');
	}

	public static formatMonth(month: string): string {
		return dayjs(month).format(MONTH_LABEL_FORMAT).toLowerCase();
	}

	public static formatDay(day: string): string {
		return dayjs(day).format(DAY_LABEL_FORMAT).toLowerCase();
	}
}
