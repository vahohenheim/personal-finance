import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Radio, RadioChangeEvent } from 'antd';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListTransactionsComponent } from '../../../components/transaction';
import { useGetTransactions } from '../../../api/transaction/get-transactions.hook';
import { TransactionType } from '../../../models/transaction';
import { useState } from 'react';

const ViewTransactionsPage: FC = () => {
	const [transactionType, setTransactionType] = useState<TransactionType>(
		TransactionType.SPENT
	);
	const getTransactions = useGetTransactions(100);

	const handleTransactionTypeChange = (event: RadioChangeEvent) => {
		setTransactionType(event.target.value);
	};

	return (
		<>
			<Helmet>
				<title>transactions | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/transactions/add">
								<Button type="primary" block={true}>
									Add a transaction
								</Button>
							</Link>
						}
					>
						Transactions
					</TitleComponent>
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
