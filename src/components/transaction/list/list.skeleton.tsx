import styles from './list.module.css';
import { FC } from 'react';
import { Skeleton } from 'antd';
import { ItemSkeletonTransactionComponent } from '../item/item.skeleton';

export const ListSkeletonTransactionsComponent: FC = () => {
	return (
		<div className={styles.month}>
			<h3>
				<Skeleton.Button active size="small" block={true} />
			</h3>
			<div className={styles.day}>
				<p>
					<Skeleton.Button active size="small" block={true} />
				</p>
				<div>
					<ItemSkeletonTransactionComponent />
				</div>
				<div>
					<ItemSkeletonTransactionComponent />
				</div>
				<div>
					<ItemSkeletonTransactionComponent />
				</div>
			</div>
			<div className={styles.day}>
				<p>
					<Skeleton.Button active size="small" block={true} />
				</p>
				<div>
					<ItemSkeletonTransactionComponent />
				</div>
				<div>
					<ItemSkeletonTransactionComponent />
				</div>
			</div>
		</div>
	);
};
