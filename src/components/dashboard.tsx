import React from 'react';
import type { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '../user.model';
import { Helmet } from 'react-helmet';
import AddTransaction from './add-transation';
import Transactions from './transactions/transations';
import styles from './dashboard.module.css';

const Dashboard: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>

			<div className="container center-block">
				<section className={styles.section}>
					<Transactions />
				</section>
				<section className={styles.section}>
					<AddTransaction />
				</section>
			</div>
		</>
	);
};

export default Dashboard;
