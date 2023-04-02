import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import type { Transaction } from '../../../gql/graphql';
import TitleComponent from '../../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/format-currency';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InfosComponent from '../../../components/infos/infos';

const GET_TRANSACTION_QUERY = graphql(`
	query GetTransaction($id: uuid!) {
		transaction(where: { id: { _eq: $id } }) {
			amount
			company {
				id
				label
				logo
			}
			budget {
				id
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

const DetailTransactionPage = () => {
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

	const TransactionActions = () => {
		return (
			<div className={styles.actions}>
				<LinkComponent
					to={`/transactions/${transaction?.id as string}/edit`}
				>
					<EditOutlined className={styles.edit} />
				</LinkComponent>
				<DeleteOutlined className={styles.delete} />
			</div>
		);
	};

	return (
		<>
			<Helmet>
				<title>transaction {transaction?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<TitleComponent
						heading="h2"
						action={<TransactionActions />}
					>
						{transaction?.label}
					</TitleComponent>
					<InfosComponent
						infos={[
							{
								label: 'type',
								value: transaction?.transaction_type,
							},
							{
								label: 'company',
								value: (
									<LinkComponent
										active={true}
										to={`/companies/${
											transaction?.company?.id as string
										}`}
									>
										{transaction?.company?.label}
									</LinkComponent>
								),
							},
							{
								label: 'budget',
								value: (
									<LinkComponent
										active={true}
										to={`/budgets/${
											transaction?.budget?.id as string
										}`}
									>
										{transaction?.budget?.label}
									</LinkComponent>
								),
							},
							{
								label: 'date',
								value: dayjs(
									transaction?.date as string
								).format('DD MMMM YYYY'),
							},
							{
								label: 'amount',
								value: formatCurrency(transaction?.amount),
							},
						]}
					/>
				</Section>
			</div>
		</>
	);
};

export default DetailTransactionPage;
