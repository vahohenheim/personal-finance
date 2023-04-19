import { FC } from 'react';
import { Card, Skeleton } from 'antd';
import TitleComponent from '../title/title';
import styles from './entries.module.css';

export const EntriesSkeletonComponent: FC = () => {
	return (
		<Card>
			<p className={styles.label}>month entries</p>
			<TitleComponent heading={'h1'} className={styles.amount}>
				<Skeleton.Button active size="small" />
			</TitleComponent>
		</Card>
	);
};
