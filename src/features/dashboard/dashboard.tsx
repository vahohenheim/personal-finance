import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import ListTransactionsComponent from '../transactions/components/list/list';

const DashboardPage: FC = () => {
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
					<ListTransactionsComponent limit={4} />
					<Link to="/transactions/add">
						<Button type="primary" block={true} size="large">
							Add transaction
						</Button>
					</Link>
				</Section>
			</div>
		</>
	);
};

export default DashboardPage;
