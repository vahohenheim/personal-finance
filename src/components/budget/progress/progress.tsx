import classNames from 'classnames';
import { FC } from 'react';
import styles from './progress.module.css';

export const BudgetProgressComponent: FC<{ percent: number }> = ({
	percent = 0,
}) => {
	const renderedPercent = percent > 100 ? 100 : percent;
	return (
		<div
			className={classNames(styles.progress, {
				[styles.exceed]: percent > 100,
			})}
		>
			<div
				className={styles.progression}
				style={{ width: `${renderedPercent}%` }}
			></div>
		</div>
	);
};
