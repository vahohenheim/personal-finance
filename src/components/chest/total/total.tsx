import { FC } from 'react';
import { Card, Skeleton } from 'antd';
import Title from '../../title/title';
import styles from './total.module.css';
import { TotalChestsComponentProps } from './total.model';
import { Chest, Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';

export const TotalChestsComponent: FC<TotalChestsComponentProps> = ({
	chests = [],
	loading = false,
}) => {
	const aggregateAmountTransactions = (
		sum: number,
		amount: number
	): number => {
		sum = amount + sum;
		return sum;
	};

	const getTransactionAmount = (transaction: Partial<Transaction>) =>
		transaction.amount as number;

	const aggregateAmountChests = (sum: number, chest: Chest): number => {
		sum =
			chest?.transactions
				.map(getTransactionAmount)
				.reduce(aggregateAmountTransactions, 0) + sum;
		return sum;
	};

	const amount = chests.reduce(aggregateAmountChests, 0);

	return (
		<Card>
			<div className={styles.total}>
				<Title className={styles.amount} heading="h1" center={true}>
					{loading ? (
						<Skeleton.Button active size="small" />
					) : (
						formatCurrency(amount)
					)}
				</Title>
				<p className={styles.text}>patrimony</p>
				<p className={styles.count}>{chests.length} projects</p>
			</div>
		</Card>
	);
};
