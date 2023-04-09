import { Card, Skeleton } from 'antd';
import { FC } from 'react';
import styles from './item.module.css';
import { IconCompanyComponent } from '../icon/icon';

export const ItemSkeletonCompanyComponent: FC = () => {
	return (
		<Card className={styles.card}>
			<div className={styles.body}>
				<div className={styles.content}>
					<IconCompanyComponent />
					<div className={styles.title}>
						<p className={styles.label}>
							<Skeleton.Button active size="small" />
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};
