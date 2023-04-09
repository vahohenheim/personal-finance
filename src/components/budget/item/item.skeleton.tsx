import { Card, Skeleton } from 'antd';
import { FC } from 'react';
import { BudgetProgressComponent } from '../progress/progress';
import styles from './item.module.css';

export const ItemSkeletonBudgetComponent: FC = () => {
	return (
		<Card className={styles.card}>
			<div className={styles.body}>
				<p className={styles.label}>
					<Skeleton.Button active size="small" />
				</p>
				<p className={styles.amount}>
					<Skeleton.Button active size="small" />
				</p>
				<BudgetProgressComponent percent={0} />
			</div>
		</Card>
	);
};
