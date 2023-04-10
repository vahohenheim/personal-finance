import { FC } from 'react';
import { MonthProgressComponentProps } from './month-progress.model';
import { ProgressComponent } from '../progress/progress';
import dayjs from 'dayjs';
import styles from './month-progress.module.css';

export const MonthProgressComponent: FC<MonthProgressComponentProps> = ({
	className,
}) => {
	const today = dayjs();
	const percent = Math.round((today.date() * 100) / today.daysInMonth());

	return (
		<div className={className}>
			<div className={styles.label}>
				<p>{today.format('DD dddd, MMMM YYYY').toLowerCase()}</p>
				<p>{percent}%</p>
			</div>
			<ProgressComponent percent={percent} />
		</div>
	);
};
