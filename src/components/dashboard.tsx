import React from 'react';
import type { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '../user.model';
import { Helmet } from 'react-helmet';
import AddTransaction from './add-transation';
import Transactions from './transactions/transations';
import { SectionComponent } from './section/section';

const Dashboard: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<Transactions />
				</SectionComponent>
				<SectionComponent>
					<AddTransaction />
				</SectionComponent>
			</div>
		</>
	);
};

export default Dashboard;
