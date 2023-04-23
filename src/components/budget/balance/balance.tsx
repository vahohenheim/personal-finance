import { FC } from 'react';
import { BalanceBudgetComponentProps } from './balance.model';
import { Button, Card, Skeleton } from 'antd';
import { ListBudgetAdapter } from './balance.adapter';
import { formatCurrency } from '../../../utils/format-currency';
import InfosComponent from '../../infos/infos';
import Title from '../../title/title';
import dayjs from 'dayjs';
import styles from './balance.module.css';
import { MonthProgressComponent } from '../../month-progress/month-progress';
import { DonutComponent } from '../../donut/donut';
import LinkComponent from '../../link/link/link';

export const BalanceBudgetComponent: FC<BalanceBudgetComponentProps> = ({
	budgets = [],
	currentMonth,
	loading = false,
	lite = false,
}) => {
	const { totalTransactions, totalBudget, rest } =
		ListBudgetAdapter.getBudgetTotal(budgets);
	const amount = `${rest > 0 ? '+' : '-'} ${formatCurrency(rest)}`;
	const monthLabel = dayjs(currentMonth?.start_at as string)
		.format('MMMM YYYY')
		.toLowerCase();
	const month = `${monthLabel} balance`;
	const today = dayjs();
	const isCurrentMonth =
		today.month() === dayjs(currentMonth?.start_at).month();
	const percent = ((totalTransactions || 0) * 100) / (totalBudget || 0);
	if (!isCurrentMonth && !loading) {
		return (
			<LinkComponent to={'/close'}>
				<Button type="primary" block={true} size="large">
					close {monthLabel} ?
				</Button>
			</LinkComponent>
		);
	}

	return (
		<Card>
			<div className={styles.balance}>
				<div>
					<DonutComponent
						value={percent || 0}
						size={50}
						strokewidth={6}
					/>
				</div>
				<div>
					<p className={styles.month}>
						{loading ? (
							<Skeleton.Button active size="small" />
						) : (
							month
						)}
					</p>
					<Title className={styles.amount} heading="h1">
						{loading ? (
							<Skeleton.Button active size="small" />
						) : (
							amount
						)}
					</Title>
				</div>
			</div>
			{!lite ? (
				<InfosComponent
					infos={[
						{
							label: '💰 month budget',
							value: formatCurrency(totalBudget),
						},
						{
							label: '💸 month spent',
							value: formatCurrency(totalTransactions),
						},
					]}
				/>
			) : (
				''
			)}
			<MonthProgressComponent className={styles.progress} />
		</Card>
	);
};
