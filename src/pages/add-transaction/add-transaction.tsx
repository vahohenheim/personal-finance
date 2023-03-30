import React from 'react';
import type { FC } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { User } from '../../user.model';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import AddTransaction from '../../components/add-transaction/add-transation';
import { Button } from 'antd';

const AddTransactionPage: FC = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<Link to="/">
						<Button type="link">{'<'} back</Button>
					</Link>
					<AddTransaction />
				</Section>
			</div>
		</>
	);
};

export default AddTransactionPage;
