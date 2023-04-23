import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link/link';
import type { Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import { ListTransactionsComponent } from '../../../components/transaction';
import { Button } from 'antd';
import { BudgetIconComponent } from '../../../components/budget';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import classNames from 'classnames';
import { useGetBudget } from '../../../api/budget/get-budget.hook';
import { useGetUser } from '../../../api/user/get-user.hook';
import { useUserId } from '@nhost/react';
import { getCurrentMonthFromUser } from '../../../utils/get-current-month-from-user';

const DetailBudgetPage = () => {
	const { id } = useParams();
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const currentMonth = getCurrentMonthFromUser(getUser?.data?.user);
	const getBudget = useGetBudget(
		id || '',
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);
	const budget = getBudget?.data?.budget[0];
	const loading = getBudget.isLoading || getUser.isLoading;

	const aggregateAmountTransactions = (
		sum: number,
		transaction: Transaction
	) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	};

	const amountTransactions = budget?.transactions.reduce(
		aggregateAmountTransactions,
		0
	);

	const percent =
		((amountTransactions || 0) * 100) / budget?.budget_months[0]?.amount;

	return (
		<>
			<Helmet>
				<title>transaction {budget?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					loading={loading}
					className={classNames({
						[styles.exceed]: percent > 100,
					})}
					backgroundColor={budget?.budget_type?.color || ''}
					icon={<BudgetIconComponent icon={budget?.icon || ''} />}
					title={budget?.label || ''}
					amount={
						<>
							<span>{formatCurrency(amountTransactions)}</span>
							<span className={styles.budgetAmount}>
								/
								{formatCurrency(
									budget?.budget_months[0]?.amount
								)}
							</span>
						</>
					}
				/>
				<Section className={styles.actions}>
					<LinkComponent to={`/budgets/${budget?.id as string}/edit`}>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
				</Section>
				<Section>
					<ListTransactionsComponent
						transactions={budget?.transactions}
						loading={loading}
					/>
				</Section>
			</div>
		</>
	);
};

export default DetailBudgetPage;
