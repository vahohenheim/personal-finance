import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import ListTransactionsComponent from './components/list/list';

const TransactionsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>transactions | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<Title
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
					</Title>
					<ListTransactionsComponent limit={100} />
				</Section>
			</div>
		</>
	);
};

export default TransactionsPage;
