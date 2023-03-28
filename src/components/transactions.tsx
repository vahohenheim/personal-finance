import { useQuery } from '@tanstack/react-query';
import { graphql } from '../gql/gql';
import { gqlClient } from '../utils/graphql-client';

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

	const { transactions } = data;

	return (
		<div>
			<h2>Transactions</h2>
			<div>
				{(transactions || []).map((transaction) => (
					<div key={transaction.id}>
						{transaction?.label} : {transaction?.amount}
					</div>
				))}
			</div>
		</div>
	);
};

export default Transactions;
