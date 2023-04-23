import { FC } from 'react';
import { PatrimonyComponentProps } from './patrimony.model';
import { Card } from 'antd';
import TitleComponent from '../title/title';
import styles from './patrimony.module.css';
import { formatCurrency } from '../../utils/format-currency';
import { ChestService } from '../../services/chest';
import { PatrimonySkeletonComponent } from './patrimony.skeleton';
import LinkComponent from '../link/link/link';

export const PatrimonyComponent: FC<PatrimonyComponentProps> = ({
	chests = [],
	loading = false,
}) => {
	const amount = ChestService.getChestsSavingAndPicks(chests);

	if (loading) {
		return <PatrimonySkeletonComponent />;
	}

	return (
		<LinkComponent className={styles.link} to="/chests">
			<Card>
				<p className={styles.label}>patrimony</p>
				<TitleComponent heading={'h1'} className={styles.amount}>
					{formatCurrency(amount)}
				</TitleComponent>
			</Card>
		</LinkComponent>
	);
};
