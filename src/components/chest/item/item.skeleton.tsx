import { Card, Skeleton } from 'antd';
import { FC } from 'react';
import styles from './item.module.css';
import { DonutComponent } from '../../donut/donut';

export const ItemSkeletonChestComponent: FC = () => {
	return (
		<Card className={styles.card}>
			<div className={styles.body}>
				<DonutComponent value={0} size={40} strokewidth={6} />
				<div className={styles.title}>
					<p className={styles.label}>
						<Skeleton.Button active size="small" />
					</p>
					<p className={styles.amount}>
						<Skeleton.Button active size="small" />
					</p>
				</div>
			</div>
		</Card>
	);
};
