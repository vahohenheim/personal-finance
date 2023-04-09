import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import { ListTransactionsComponent } from '../../components/transaction';
import { useGetTransactions } from '../../api/transaction/get-transactions.hook';
import { Transaction } from '../../gql/graphql';

const DashboardPage: FC = () => {
	const transactionsLimit = 100;
	const getTransactions = useGetTransactions(transactionsLimit);
	const transactions = [...(getTransactions?.data?.transaction || [])];
	transactions.length = 4;
	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<Link to="/transactions/add">
						<Button type="primary" block={true} size="large">
							Add transaction
						</Button>
					</Link>
				</Section>
				<Section>
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
				</Section>
			</div>
		</>
	);
};

export default DashboardPage;
