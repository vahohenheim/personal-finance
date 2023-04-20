import { FC } from 'react';
import { Card, Skeleton } from 'antd';
import Title from '../../title/title';
import styles from './total.module.css';
import { TotalChestsComponentProps } from './total.model';
import { Chest, Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import { ChestService } from '../../../services/chest';

export const TotalChestsComponent: FC<TotalChestsComponentProps> = ({
	chests = [],
	loading = false,
}) => {
	const amount = ChestService.getChestsSavingAndPicks(chests);
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
