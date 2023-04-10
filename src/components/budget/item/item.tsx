import { Card } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProgressComponent } from '../../progress/progress';
import { Budget_Month, Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import type { ItemBudgetComponentProps } from './item.model';
import styles from './item.module.css';

export const ItemBudgetComponent: FC<ItemBudgetComponentProps> = ({
	budget,
}) => {
	const currentMonthBudget: Budget_Month = budget?.budget_months[0];

	const aggregateAmountTransactions = (
		sum: number,
		transaction: Transaction
	) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	};

	const amountTransactions = budget.transactions.reduce(
		aggregateAmountTransactions,
		0
	);

	const percent = (amountTransactions * 100) / currentMonthBudget?.amount;
	return (
		<Link className={styles.link} to={`/budgets/${budget.id as string}`}>
			<Card
				className={classNames(styles.card, {
					[styles.exceed]: percent > 100,
				})}
			>
				<div className={styles.body}>
					<p className={styles.label}>
						{budget?.icon} {budget?.label}
					</p>
					<p className={styles.amount}>
						<span className={styles.current}>
							{formatCurrency(amountTransactions)}
						</span>
						<span className={styles.budget}>
							/{formatCurrency(budget?.budget_months[0]?.amount)}
						</span>
					</p>
					<ProgressComponent percent={percent} />
				</div>
			</Card>
		</Link>
	);
};
