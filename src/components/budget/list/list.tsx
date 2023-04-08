import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import InfosComponent from '../../infos/infos';
import { formatCurrency } from '../../../utils/format-currency';
import { ListBudgetComponentProps } from './list.model';
import { ItemBudgetComponent } from '../item/item';

export const ListBudgetComponent: FC<ListBudgetComponentProps> = ({
	budgets = [],
	loading = false,
}) => {
	// TODO: replace with user current month

	if (loading) {
		return <div>Loading...</div>;
	}

	if (budgets?.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={'Any budget'}
				/>
			</div>
		);
	}

	const transactionsAmount = budgets?.map((budget) => {
		return (budget.transactions || []).reduce((sum, transaction) => {
			sum = (transaction.amount as number) + sum;
			return sum;
		}, 0);
	});

	const totalTransactions = transactionsAmount.reduce((sum, amount) => {
		sum = amount + sum;
		return sum;
	}, 0);

	const totalBudget = budgets?.reduce((sum, budget) => {
		sum = (budget.budget_months[0].amount as number) + sum;
		return sum;
	}, 0);

	const rest = totalBudget - totalTransactions;

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{budgets?.map((budget) => (
					<div key={budget.id as string}>
						<ItemBudgetComponent budget={budget} />
					</div>
				))}
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
