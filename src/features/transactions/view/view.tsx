import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListTransactionsComponent } from '../../../components/transaction';
import { useGetTransactions } from '../../../api/transaction/get-transactions.hook';

const ViewTransactionsPage: FC = () => {
	const getTransactions = useGetTransactions(100);
	return (
		<>
			<Helmet>
				<title>transactions | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/transactions/add">
								<Button type="primary" block={true}>
									Add transaction
								</Button>
							</Link>
						}
					>
						Transactions
					</TitleComponent>
					<ListTransactionsComponent
						transactions={getTransactions?.data?.transaction}
						loading={getTransactions?.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewTransactionsPage;
