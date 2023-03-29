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

	const aggregateByDay = (acc: { [key: string]: any }, cur: any) => {
		const date = dayjs(cur.created_at as string).format('YYYY-MM-DD');
		//`${date.month() + 1}-${date.day() + 1}-${date.year()}`;
		if (!acc[date]) {
			acc[date] = [cur];
		} else {
			acc[date].push(cur);
		}
		return acc;
	};

	const currentMonth = dayjs().month();

	const transactionByDay = transactions.reduce<{ [key: string]: any }>(
		aggregateByDay,
		{}
	);

	const transactionByDayByMonth = Object.keys(transactionByDay).reduce(
		(acc: { [key: string]: any }, day: string) => {
			const date = dayjs(day).format('YYYY-MM');
			if (!acc[date]) {
				acc[date] = {
					[day]: transactionByDay[day],
				};
			} else {
				acc[date] = {
					...acc[date],
					[day]: transactionByDay[day],
				};
			}
			return acc;
		},
		{}
	);

	console.log('transactionByDay', transactionByDay);

	console.log('transationsByMonth', transactionByDayByMonth);

	return (
		<div>
			<h2 className={styles.title}>Transactions</h2>

			<div className={styles.list}>
				{(Object.keys(transactionByDayByMonth) || []).map((month) => (
					<div key={month} className={styles.month}>
						<h3>
							this month,{' '}
							{dayjs(month).format('MMMM YYYY').toLowerCase()}
						</h3>
						{Object.keys(
							transactionByDayByMonth[month] as {
								[key: string]: any;
							}
						).map((day) => (
							<div key={day} className={styles.day}>
								<p>
									{dayjs(day)
										.format('DD dddd, MMMM')
										.toLowerCase()}
								</p>
								{transactionByDayByMonth[month][day].map(
									(transation: any) => (
										<div key={transation.id}>
											<TransationComponent
												transation={transation}
											/>
										</div>
									)
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Transactions;
