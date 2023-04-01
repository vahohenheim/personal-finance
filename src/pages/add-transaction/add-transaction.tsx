import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import AddTransaction from '../../components/add-transaction/add-transation';

const AddTransactionPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<AddTransaction />
				</Section>
			</div>
		</>
	);
};

export default AddTransactionPage;
