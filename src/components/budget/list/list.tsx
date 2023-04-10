import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import { ListBudgetComponentProps } from './list.model';
import { ItemBudgetComponent } from '../item/item';
import { ListSkeletonBudgetsComponent } from './list.skeleton';

export const ListBudgetComponent: FC<ListBudgetComponentProps> = ({
	budgets = [],
	loading = false,
}) => {
	const empty = !budgets || budgets.length === 0;

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{loading ? (
					<ListSkeletonBudgetsComponent />
				) : empty ? (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={'Any budget'}
					/>
				) : (
					budgets?.map((budget) => (
						<div key={budget.id as string}>
							<ItemBudgetComponent budget={budget} />
						</div>
					))
				)}
			</div>
		</div>
	);
};
