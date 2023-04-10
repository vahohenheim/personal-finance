import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import { ListTransactionsComponent } from '../../components/transaction';
import { useGetTransactions } from '../../api/transaction/get-transactions.hook';
import { BalanceBudgetComponent } from '../../components/budget';
import { useUserId } from '@nhost/react';
import { useGetUser } from '../../api/user/get-user.hook';
import { getCurrentMonthFromUser } from '../../utils/get-current-month-from-user';
import { useGetBudgets } from '../../api/budget/get-budgets.hook';

const DashboardPage: FC = () => {
	const transactionsLimit = 100;
	const getTransactions = useGetTransactions(transactionsLimit);
	const transactions = [...(getTransactions?.data?.transaction || [])];
	transactions.length = 4;
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const currentMonth = getCurrentMonthFromUser(getUser?.data?.user);
	const getBudgets = useGetBudgets(
		100,
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);
	const budgets = getBudgets.data?.budget || [];
	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BalanceBudgetComponent
						loading={getBudgets.isLoading}
						currentMonth={currentMonth}
						budgets={budgets}
					/>
				</SectionComponent>
				<SectionComponent>
					<Link to="/transactions/add">
						<Button type="primary" block={true} size="large">
							Add a transaction
						</Button>
					</Link>
				</SectionComponent>
				<SectionComponent>
					<Title
						heading={'h2'}
						action={
							<Link to="/transactions">
								<Button>See all</Button>
							</Link>
						}
					>
						Last transactions
					</Title>
					<ListTransactionsComponent
						transactions={transactions}
						loading={getTransactions?.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default DashboardPage;
