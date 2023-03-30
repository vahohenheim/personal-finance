import type { FC } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { User } from '../../user.model';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import Transactions from '../../components/transactions/transations';
import { Button } from 'antd';
import Title from '../../components/title/title';

const DashboardPage: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
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
					<Transactions limit={5} />
					<Link to="/add-transaction">
						<Button type="primary" block={true}>
							Add transaction
						</Button>
					</Link>
				</Section>
			</div>
		</>
	);
};

export default DashboardPage;
