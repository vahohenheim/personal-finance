import type { FC } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Radio, RadioChangeEvent } from 'antd';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListTransactionsComponent } from '../../../components/transaction';
import { useGetTransactions } from '../../../api/transaction/get-transactions.hook';
import { TransactionType } from '../../../models/transaction';
import { BackComponent } from '../../../components/back/back';

const ViewTransactionsPage: FC = () => {
	const [searchParams] = useSearchParams();
	const [transactionType, setTransactionType] = useState<TransactionType>(
		(searchParams.get('type') as TransactionType) || TransactionType.SPENT
	);
	const getTransactions = useGetTransactions(100);

	const handleTransactionTypeChange = (event: RadioChangeEvent) => {
		setTransactionType(event?.target?.value as TransactionType);
	};

	return (
		<>
			<Helmet>
				<title>transactions | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading={'h2'}>Transactions</TitleComponent>
					<Radio.Group
						size="large"
						defaultValue={transactionType}
						onChange={handleTransactionTypeChange}
					>
						<Radio.Button value={TransactionType.SPENT}>
							{TransactionType.SPENT}
						</Radio.Button>
						<Radio.Button value={TransactionType.ENTRY}>
							{TransactionType.ENTRY}
						</Radio.Button>
						<Radio.Button value={TransactionType.SAVING}>
							{TransactionType.SAVING}
						</Radio.Button>
						<Radio.Button value={TransactionType.PICK}>
							{TransactionType.PICK}
						</Radio.Button>
					</Radio.Group>
					<ListTransactionsComponent
						transactions={getTransactions?.data?.transaction}
						transactionType={transactionType}
						loading={getTransactions?.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewTransactionsPage;
