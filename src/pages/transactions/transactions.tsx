import type { FC } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { User } from '../../user.model';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import Transactions from '../../components/transactions/transations';
import { Button } from 'antd';
import Title from '../../components/title/title';

const TransactionsPage: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

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
							<Link to="/add-transaction">
								<Button type="primary" block={true}>
									Add transaction
								</Button>
							</Link>
						}
					>
						Transactions
					</Title>
					<Transactions limit={100} />
				</Section>
			</div>
		</>
	);
};

export default TransactionsPage;
