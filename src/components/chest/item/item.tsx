import { Card } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/format-currency';
import { ItemChestComponentProps } from './item.model';
import styles from './item.module.css';
import { DonutComponent } from '../../donut/donut';
import { ChestService } from '../../../services/chest';
import { ChestType } from '../../../models/chest';
import { CalendarIcon } from '../../../icons/calendar';
import { formatDate } from '../../../utils/format-date';

export const ItemChestComponent: FC<ItemChestComponentProps> = ({ chest }) => {
	const hasExpectedAmount = !!chest.amount;
	const amounts = ChestService.getChestAmounts(chest);
	const amount = amounts.savings - amounts.picks;
	const percent = chest.amount ? (amount * 100) / chest?.amount : 0;
	return (
		<Link className={styles.link} to={`/chests/${chest?.id as string}`}>
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
						{chest.type === ChestType.PROJECT ? (
							<p className={styles.date}>
								<CalendarIcon height={14} width={14} />
								{formatDate(chest?.end_at)}
							</p>
						) : (
							''
						)}
					</div>
				</div>
			</Card>
		</Link>
	);
};
