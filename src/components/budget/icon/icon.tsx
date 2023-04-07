import classNames from 'classnames';
import { FC } from 'react';
import { BudgetIconComponentProps } from './icon.model';
import styles from './icon.module.css';

export const BudgetIconComponent: FC<BudgetIconComponentProps> = ({
	color,
	icon,
	className,
}) => {
	return (
		<div className={classNames(styles.budget, className as string)}>
			<div
				className={styles.background}
				style={{
					backgroundColor: color,
				}}
			></div>
			<div className={styles.icon}>{icon}</div>
		</div>
	);
};
