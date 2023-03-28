import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { TransationComponent } from '../transaction/transaction';
import styles from './transactions.module.css';
import dayjs from 'dayjs';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions {
		transactions(order_by: { created_at: desc }) {
			amount
			budget_id
			label
			type
			created_at
			updated_at
			id
			user_id
		}
	}
`);

const Transactions = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request(GET_TRANSACTIONS_QUERY);
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		console.error(error);
		return <div>Error</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	const transactions = data.transactions;

	const aggregateByDay = () => {};

	const aggregateByMonth = (acc: { [key: number]: any }, cur: any) => {
		const date = dayjs(cur.created_at as string);
		if (!acc[date.month()]) {
			acc[date.month()] = [cur];
		} else {
			acc[date.month()].push(cur);
		}
		return acc;
	};

	const currentMonth = dayjs().month();

	const transationsByMonth = transactions.reduce<{ [key: number]: any }>(
		aggregateByMonth,
		{}
	);

	console.log('transationsByMonth', transationsByMonth);

	return (
		<div>
			<h2 className={styles.title}>Transactions</h2>
			<h3 className={styles.month}>this month, march 2023</h3>
			<p className={styles.day}>26 Thuesday, March</p>
			<div className={styles.list}>
				{(transactions || []).map((transaction) => (
					<TransationComponent
						key={transaction.id}
						transation={transaction}
					/>
				))}
			</div>
		</div>
	);
};

export default Transactions;
