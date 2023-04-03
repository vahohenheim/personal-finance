import { Card } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../../utils/format-currency';
import { ItemTransactionComponentProps } from './item.model';
import styles from './item.module.css';

const ItemTransactionComponent: FC<ItemTransactionComponentProps> = ({
	transaction,
}) => {
	const amount = formatCurrency(transaction.amount);
	const budgetColor = transaction.budget.budget_type?.color;
	return (
		<Link
			className={styles.link}
			to={`/transactions/${transaction.id as string}`}
		>
			<Card className={styles.card}>
				<div className={styles.body}>
					<div className={styles.content}>
						<div className={styles.budget}>
							<div
								className={styles.budgetBackground}
								style={{
									backgroundColor: budgetColor,
								}}
							></div>
							<div className={styles.budgetIcon}>
								{transaction?.budget?.icon}
							</div>
						</div>
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

export default ItemTransactionComponent;
