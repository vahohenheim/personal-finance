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

export const ItemTransactionComponent: FC<ItemTransactionComponentProps> = ({
	transaction,
}) => {
	const amount = formatCurrency(transaction.amount);
	const budgetColor = transaction.budget?.budget_type?.color as string;
	const isEntry = transaction.transaction_type === TransactionType.ENTRY;
	return (
		<Link
			className={styles.link}
			to={`/transactions/${transaction.id as string}`}
		>
			<Card
				className={classNames(styles.card, { [styles.entry]: isEntry })}
			>
				<div className={styles.body}>
					<div className={styles.content}>
						{isEntry ? (
							<TransactionEntryIconComponent />
						) : (
							<BudgetIconComponent
								icon={transaction?.budget?.icon || ''}
								color={budgetColor || ''}
							/>
						)}
						<div className={styles.title}>
							<p className={styles.company}>
								{transaction?.company?.label}
							</p>
							<p className={styles.label}>{transaction?.label}</p>
						</div>
					</div>
					<div className={styles.amount}>
						<p>{amount}</p>
					</div>
				</div>
			</Card>
		</Link>
	);
};