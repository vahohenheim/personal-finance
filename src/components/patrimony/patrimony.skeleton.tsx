import { FC } from 'react';
import { Card, Skeleton } from 'antd';
import TitleComponent from '../title/title';
import styles from './patrimony.module.css';

export const PatrimonySkeletonComponent: FC = () => {
	return (
		<Card>
			<p className={styles.label}>patrimony</p>
			<TitleComponent heading={'h1'} className={styles.amount}>
				<Skeleton.Button active size="small" />
			</TitleComponent>
		</Card>
	);
};
