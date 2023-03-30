import { Card } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/format-currency';
import { TransactionComponentProps } from './transaction.model';
import styles from './transation.module.css';

export const TransationComponent: FC<TransactionComponentProps> = ({
	transation,
}) => {
	const amount = formatCurrency(transation.amount);

	return (
		<Link
			className={styles.link}
			to={`/transaction/${transation.id as string}`}
		>
			<Card className={styles.card}>
				<div className={styles.body}>
					<div className={styles.content}>
						<div className={styles.avatar}></div>
						<div className={styles.title}>
							<p className={styles.budget}>🌮 food</p>
							<p className={styles.label}>{transation.label}</p>
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
