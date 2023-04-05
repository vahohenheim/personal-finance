import classNames from 'classnames';
import { FC } from 'react';
import { BudgetIconComponentProps } from './budget-icon.model';
import styles from './budget-icon.module.css';

const BudgetIconComponent: FC<BudgetIconComponentProps> = ({
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

export default BudgetIconComponent;
