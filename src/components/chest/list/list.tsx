import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import { ListChestComponentProps } from './list.model';
import { ItemChestComponent } from '../item/item';
import { ListSkeletonChestsComponent } from './list.skeleton';

export const ListChestComponent: FC<ListChestComponentProps> = ({
	chests = [],
	loading = false,
}) => {
	const empty = !chests || chests.length === 0;

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{loading ? (
					<ListSkeletonChestsComponent />
				) : empty ? (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={'Any chest'}
					/>
				) : (
					chests?.map((chest) => (
						<div key={chest.id}>
							<ItemChestComponent chest={chest} />
						</div>
					))
				)}
			</div>
		</div>
	);
};
