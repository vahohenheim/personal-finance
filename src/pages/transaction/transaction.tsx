import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { Company, Transaction } from '../../gql/graphql';
import Title from '../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { formatCurrency } from '../../utils/format-currency';
import styles from './transaction.module.css';

const GET_TRANSACTION_QUERY = graphql(`
	query GetTransaction($id: uuid!) {
		transaction(where: { id: { _eq: $id } }) {
			amount
			company {
				label
				logo
			}
			budget {
				label
			}
			label
			transaction_type
			created_at
			updated_at
			id
			user_id
		}
	}
`);

const TransactionPage = () => {
	const { id } = useParams();

	const getTransaction = useQuery({
		queryKey: [`transation-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ id: string }
			>(GET_TRANSACTION_QUERY, {
				id: id || '',
			});
		},
	});

	const transaction = getTransaction?.data?.transaction[0];

	if (getTransaction.isLoading) {
		return <div>Loading...</div>;
	}

	if (getTransaction.isError) {
		console.error(getTransaction.error);
		return <div>Error</div>;
	}

	if (!getTransaction.data) {
		return <div>No data</div>;
	}

	return (
		<>
			<Helmet>
				<title>transaction {transaction?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<Title heading="h2">
						Transaction : {transaction?.label}
					</Title>
					<div className={styles.infos}>
						<div className={styles.info}>
							<p>type</p>
							<p>{transaction?.transaction_type}</p>
						</div>
						<div className={styles.info}>
							<p>company</p>
							<p>{transaction?.company?.label}</p>
						</div>
						<div className={styles.info}>
							<p>budget</p>
							<p>{transaction?.budget?.label}</p>
						</div>
						<div className={styles.info}>
							<p>date</p>
							<p>
								{dayjs(transaction?.date).format(
									'DD MMMM YYYY'
								)}
							</p>
						</div>
						<div className={styles.info}>
							<p>amount</p>
							<p>{formatCurrency(transaction?.amount)}</p>
						</div>
					</div>
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
