import { Card } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/format-currency';
import { ItemChestComponentProps } from './item.model';
import styles from './item.module.css';
import { DonutComponent } from '../../donut/donut';
import { Transaction } from '../../../gql/graphql';

export const ItemChestComponent: FC<ItemChestComponentProps> = ({ chest }) => {
	const aggregateAmountTransactions = (
		sum: number,
		amount: number
	): number => {
		sum = amount + sum;
		return sum;
	};

	const getTransactionAmount = (transaction: Partial<Transaction>) =>
		transaction.amount as number;

	const amount = chest.transactions
		.map(getTransactionAmount)
		.reduce(aggregateAmountTransactions, 0);
	const hasExpectedAmount = !!chest.amount;
	const percent = chest.amount ? (amount * 100) / chest?.amount : 0;

	return (
		<Link className={styles.link} to={`/chests/${chest.id}`}>
			<Card className={styles.card}>
				<div className={styles.body}>
					{hasExpectedAmount ? (
						<DonutComponent
							value={percent || 0}
							size={42}
							strokewidth={4}
						/>
					) : (
						''
					)}
					<div className={styles.title}>
						<p className={styles.label}>
							{chest?.icon} {chest?.label}
						</p>
						<p className={styles.amount}>
							{formatCurrency(amount)}
							{hasExpectedAmount ? (
								<span className={styles.expectedAmount}>
									/{formatCurrency(chest.amount)}
								</span>
							) : (
								''
							)}
						</p>
					</div>
				</div>
			</Card>
		</Link>
	);
};
