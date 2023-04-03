import styles from './list.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Empty } from 'antd';
import ItemBudgetComponent from '../item/item';
import InfosComponent from '../../../../components/infos/infos';
import { formatCurrency } from '../../../../utils/format-currency';
import { ListBudgetsComponentProps } from './list.model';

const ListBudgetsComponent: FC<ListBudgetsComponentProps> = ({
	budgets = [],
	loading = false,
}) => {
	const currentMonth = dayjs().format('MM-YYYY');

	if (loading) {
		return <div>Loading...</div>;
	}

	if (budgets.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any budget'} />
			</div>
		);
	}

	const transactionsAmount = budgets.map((budget) => {
		return (budget.transactions || []).reduce((sum, transaction) => {
			sum = (transaction.amount as number) + sum;
			return sum;
		}, 0);
	});

	const totalTransactions = transactionsAmount.reduce((sum, amount) => {
		sum = amount + sum;
		return sum;
	}, 0);

	const totalBudget = budgets.reduce((sum, budget) => {
		sum = (budget.budget_months[0].amount as number) + sum;
		return sum;
	}, 0);

	const rest = totalBudget - totalTransactions;

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{budgets.map((budget) => (
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

export default ListBudgetsComponent;
