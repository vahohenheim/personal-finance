import { FC } from 'react';
import { EntriesComponentProps } from './entries.model';
import { Card } from 'antd';
import { TransactionType } from '../../models/transaction';
import TitleComponent from '../title/title';
import styles from './entries.module.css';
import { formatCurrency } from '../../utils/format-currency';
import { Link } from 'react-router-dom';
import { EntriesSkeletonComponent } from './entries.skeleton';

export const EntriesComponent: FC<EntriesComponentProps> = ({
	transactions = [],
	loading = false,
}) => {
	const entriesAmount = transactions.reduce((sum, transaction) => {
		if (transaction.transaction_type === TransactionType.ENTRY) {
			sum = (transaction.amount as number) + sum;
		}
		return sum;
	}, 0);

	if (loading) {
		return <EntriesSkeletonComponent />;
	}

	return (
		<Link
			className={styles.link}
			to={`/transactions?type=${TransactionType.ENTRY}`}
		>
			<Card>
				<p className={styles.label}>month entries</p>
				<TitleComponent heading={'h1'} className={styles.amount}>
					{formatCurrency(entriesAmount)}
				</TitleComponent>
			</Card>
		</Link>
	);
};
