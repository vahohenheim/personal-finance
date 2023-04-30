import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import { ListChestComponentProps } from './list.model';
import { ItemChestComponent } from '../item/item';
import { ListSkeletonChestsComponent } from './list.skeleton';
import { ChestType } from '../../../models/chest';
import { useListChest } from './list.hook';
import TitleComponent from '../../title/title';

export const ListChestComponent: FC<ListChestComponentProps> = ({
	chests = [],
	loading = false,
}) => {
	const empty = !chests || chests.length === 0;
	const chestsByProject = useListChest(chests);

	return (
		<div className={styles.container}>
			{loading ? (
				<ListSkeletonChestsComponent />
			) : empty ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={'Any chest'}
				/>
			) : (
				<div className={styles.list}>
					<TitleComponent heading={'h3'} className={styles.title}>
						Bucket
					</TitleComponent>
					{chestsByProject[ChestType.BUCKET]?.map((chest) => (
						<div key={chest.id}>
							<ItemChestComponent chest={chest} />
						</div>
					))}
					<TitleComponent heading={'h3'} className={styles.title}>
						Project
					</TitleComponent>
					{chestsByProject[ChestType.PROJECT]?.map((chest) => (
						<div key={chest.id}>
							<ItemChestComponent chest={chest} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
