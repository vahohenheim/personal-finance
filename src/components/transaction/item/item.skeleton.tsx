import { Card, Skeleton } from 'antd';
import { FC } from 'react';
import styles from './item.module.css';

export const ItemSkeletonTransactionComponent: FC = () => {
	return (
		<Card className={styles.card}>
			<div className={styles.body}>
				<div className={styles.content}>
					<Skeleton.Avatar active size="small"></Skeleton.Avatar>
					<div className={styles.title}>
						<p className={styles.company}>
							<Skeleton.Button active size="small" />
						</p>
						<p className={styles.label}>
							<Skeleton.Button active size="small" />
						</p>
					</div>
				</div>
				<div className={styles.amount}>
					<Skeleton.Button active size="small" block={true} />
				</div>
			</div>
		</Card>
	);
};
