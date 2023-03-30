import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { Transactions } from '../../gql/graphql';
import Title from '../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import dayjs from 'dayjs';

const GET_TRANSACTION_QUERY = graphql(`
	query GetTransaction($id: uuid!) {
		transactions(where: { id: { _eq: $id } }) {
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

const TransactionPage = () => {
	const { id } = useParams();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: [`transation-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ transactions: Array<Transactions> },
				{ id: string }
			>(GET_TRANSACTION_QUERY, {
				id: id || '',
			});
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

	const transaction = data.transactions[0];

	return (
		<>
			<Helmet>
				<title>transaction {transaction.label} - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<Title heading={'h2'}>
						Transaction : {transaction.label}
					</Title>
					<p>amount : {transaction.amount}</p>
					<p>type: {transaction.type}</p>
					<p>
						date :{' '}
						{dayjs(transaction.created_at).format('DD MMMM YYYY')}
					</p>
					<Button type="link" block={true}>
						update
					</Button>
					<Button type="link" block={true} danger>
						delete
					</Button>
				</Section>
			</div>
		</>
	);
};

export default TransactionPage;
