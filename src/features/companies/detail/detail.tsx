import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import type { Company, Transaction } from '../../../gql/graphql';
import TitleComponent from '../../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ListTransactionsComponent from '../../transactions/components/list/list';
import { Button } from 'antd';
import DetailCoverComponent from '../../../components/detail-cover/detail-cover';
import { formatCurrency } from '../../../utils/format-currency';

const GET_COMPANY_QUERY = graphql(`
	query GetCompany($id: uuid!) {
		company(where: { id: { _eq: $id } }) {
			id
			label
			logo
			transactions(order_by: { date: desc }) {
				amount
				company {
					label
					logo
				}
				budget {
					label
					icon
					budget_type {
						color
					}
				}
				label
				transaction_type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

const DetailCompanyPage = () => {
	const { id } = useParams();

	const getCompany = useQuery({
		queryKey: [`company-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ id: string }
			>(GET_COMPANY_QUERY, {
				id: id || '',
			});
		},
	});

	const company = getCompany?.data?.company[0];

	if (getCompany.isLoading) {
		return <div>Loading...</div>;
	}

	if (getCompany.isError) {
		console.error(getCompany.error);
		return <div>Error</div>;
	}

	if (!getCompany.data) {
		return <div>No data</div>;
	}

	const aggregateAmountTransactions = (
		sum: number,
		transaction: Transaction
	) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	};

	const amountTransactions = company?.transactions.reduce(
		aggregateAmountTransactions,
		0
	);

	return (
		<>
			<Helmet>
				<title>transaction {company?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					icon={<div className={styles.avatar}></div>}
					title={company?.label as string}
					amount={<>{formatCurrency(amountTransactions)}</>}
				/>
				<Section>
					<TitleComponent heading="h3">Transactions</TitleComponent>
					<ListTransactionsComponent
						transactions={company?.transactions}
						loading={getCompany.isLoading}
					/>
				</Section>
				<Section className={styles.actions}>
					<LinkComponent
						to={`/companies/${company?.id as string}/edit`}
					>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
					<Button type="link" block={true} danger>
						delete
					</Button>
				</Section>
			</div>
		</>
	);
};

export default DetailCompanyPage;
