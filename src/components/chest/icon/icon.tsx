import classNames from 'classnames';
import { FC } from 'react';
import { BudgetIconComponentProps } from './icon.model';
import styles from './icon.module.css';

export const ChestIconComponent: FC<BudgetIconComponentProps> = ({
	icon,
	className = '',
}) => {
	return (
		<div className={classNames(styles.budget, className)}>
			<div className={styles.background}></div>
			<div className={styles.icon}>{icon}</div>
		</div>
	);
};
