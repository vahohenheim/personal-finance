import React from 'react';
import type { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '../user.model';
import { Helmet } from 'react-helmet';
import Transactions from './transactions';
import AddTransaction from './add-transation';

const Dashboard: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>

			<div>
				<h1>Dashboard of {user?.displayName}</h1>
				<Transactions />
				<AddTransaction />
			</div>
		</>
	);
};

export default Dashboard;
