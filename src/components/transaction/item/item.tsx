import { Card } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TransactionType } from '../../../models/transaction';
import { formatCurrency } from '../../../utils/format-currency';
import { ItemTransactionComponentProps } from './item.model';
import styles from './item.module.css';
import { BudgetIconComponent } from '../../budget';
import { TransactionEntryIconComponent } from '../entry-icon/entry-icon';
import { TransactionSavingIconComponent } from '../saving-icon/saving-icon';
import { ChestIconComponent } from '../../chest/icon/icon';

const getTransactionIcon = (
	transaction_type: TransactionType,
	icon = '',
	budgetColor = ''
) => {
	switch (transaction_type) {
		case TransactionType.SPENT:
			return <BudgetIconComponent icon={icon} color={budgetColor} />;
		case TransactionType.PICK:
			return <ChestIconComponent icon={icon} />;
		case TransactionType.ENTRY:
			return <TransactionEntryIconComponent />;
		case TransactionType.SAVING:
			return <TransactionSavingIconComponent />;
	}
};

export const ItemTransactionComponent: FC<ItemTransactionComponentProps> = ({
	transaction,
}) => {
	const amount = formatCurrency(transaction.amount);
	const budgetColor = transaction.budget?.budget_type?.color as string;
	const icon = transaction.budget?.icon || transaction.chest?.icon || '';
	const transactionType = transaction.transaction_type as TransactionType;

	return (
		<Link
			className={styles.link}
			to={`/transactions/${transaction.id as string}`}
		>
			<Card
				className={classNames(
					styles.card,
					styles[transaction.transaction_type]
				)}
			>
				<div className={styles.body}>
					<div className={styles.content}>
						{getTransactionIcon(transactionType, icon, budgetColor)}
						<div className={styles.title}>
							{![TransactionType.SAVING].includes(
								transactionType
							) ? (
								<p className={styles.from}>
									{transaction?.company?.label}
								</p>
							) : (
								<p className={styles.from}>
									{transaction?.chest?.icon}{' '}
									{transaction?.chest?.label}
								</p>
							)}
							<p className={styles.label}>{transaction?.label}</p>
						</div>
					</div>
					<div className={styles.amount}>
						<p>
							{[
								TransactionType.SPENT,
								TransactionType.PICK,
							].includes(transactionType)
								? '- '
								: '+ '}
							{amount}
						</p>
					</div>
				</div>
			</Card>
		</Link>
	);
};
