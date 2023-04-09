import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import InfosComponent from '../../infos/infos';
import { formatCurrency } from '../../../utils/format-currency';
import { ListBudgetComponentProps } from './list.model';
import { ItemBudgetComponent } from '../item/item';
import { ListSkeletonBudgetsComponent } from './list.skeleton';
import { ListBudgetAdapter } from './list.adapter';

export const ListBudgetComponent: FC<ListBudgetComponentProps> = ({
	budgets = [],
	loading = false,
}) => {
	// TODO: replace with user current month
	const empty = !budgets || budgets.length === 0;
	const { totalTransactions, totalBudget, rest } =
		ListBudgetAdapter.getBudgetTotal(budgets);

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
			<InfosComponent
				infos={[
					{
						label: 'total used',
						value: formatCurrency(totalTransactions),
					},
					{
						label: 'total budgets',
						value: formatCurrency(totalBudget),
					},
					{
						label: 'rest',
						value: formatCurrency(rest),
					},
				]}
			/>
		</div>
	);
};
