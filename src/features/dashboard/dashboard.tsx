import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import { ListTransactionsComponent } from '../../components/transaction';
import { BalanceBudgetComponent } from '../../components/budget';
import { useUserId } from '@nhost/react';
import { useGetUser } from '../../api/user/get-user.hook';
import { getCurrentMonthFromUser } from '../../utils/get-current-month-from-user';
import { useGetBudgets } from '../../api/budget/get-budgets.hook';
import { useGetTransactionsByMonth } from '../../api/transaction/get-transactions-by-month.hook';
import { EntriesComponent } from '../../components/entries/entries';
import { TransactionType } from '../../models/transaction';
import { PatrimonyComponent } from '../../components/patrimony/patrimony';
import { useGetChests } from '../../api/chest/get-chests.hook';
import styles from './dashboard.module.css';
import LinkComponent from '../../components/link/link/link';

const DashboardPage: FC = () => {
	const transactionsLimit = 100;
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const currentMonth = getCurrentMonthFromUser(getUser?.data?.user);
	const getBudgets = useGetBudgets(
		100,
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);
	const getChests = useGetChests(100);
	const budgets = getBudgets.data?.budget || [];
	const getTransactions = useGetTransactionsByMonth(
		transactionsLimit,
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);
	const transactions = [...(getTransactions?.data?.transaction || [])];
	const chests = [...(getChests?.data?.chest || [])];

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<LinkComponent className={styles.balance} to="/budgets">
						<BalanceBudgetComponent
							loading={getBudgets.isLoading}
							currentMonth={currentMonth}
							budgets={budgets}
							lite={true}
						/>
					</LinkComponent>
					<div className={styles.amounts}>
						<EntriesComponent
							loading={getTransactions.isLoading}
							transactions={transactions}
						/>
						<PatrimonyComponent
							loading={getChests.isLoading}
							chests={chests}
						/>
					</div>
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
						Month last transactions
					</Title>
					<ListTransactionsComponent
						transactions={transactions}
						max={4}
						transactionType={TransactionType.SPENT}
						loading={getTransactions?.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default DashboardPage;
