import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import TitleComponent from '../../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Budget } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import dayjs from 'dayjs';
import ListTransactionsComponent from '../../transactions/components/list/list';

const GET_BUDGET_QUERY = graphql(`
	query GetBudget($id: uuid!) {
		budget(where: { id: { _eq: $id } }) {
			id
			label
			budget_months {
				amount
			}
			transactions {
				amount
				budget {
					id
					label
					icon
					budget_type {
						color
					}
					budget_months {
						month_id
					}
				}
				company {
					label
					logo
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

/*
{
  transaction(where: {date: {_gte: "2023-04-01T00:00:00.000000+00:00", _lte: "2023-05-01T00:00:00.000000+00:00"}}) {
    date
  }
}
*/

const DetailBudgetPage = () => {
	const { id } = useParams();

	const getBudget = useQuery({
		queryKey: [`budget-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ budget: Array<Budget> }, { id: string }>(
				GET_BUDGET_QUERY,
				{
					id: id || '',
				}
			);
		},
	});

	const budget = getBudget?.data?.budget[0];

	if (getBudget.isLoading) {
		return <div>Loading...</div>;
	}

	if (getBudget.isError) {
		console.error(getBudget.error);
		return <div>Error</div>;
	}

	if (!getBudget.data) {
		return <div>No data</div>;
	}

	const BudgetActions = () => {
		return (
			<div className={styles.actions}>
				<LinkComponent to={`/budgets/${budget?.id as string}/edit`}>
					<EditOutlined className={styles.edit} />
				</LinkComponent>
				<DeleteOutlined className={styles.delete} />
			</div>
		);
	};

	return (
		<>
			<Helmet>
				<title>transaction {budget?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<TitleComponent heading="h2" action={<BudgetActions />}>
						{budget?.label}
					</TitleComponent>
					{budget?.budget_months.map((budgetMonth, index) => (
						<div className={styles.info} key={index}>
							<p>
								{dayjs(budgetMonth?.month?.start_at as string)
									.format('MMMM YYYY')
									.toLowerCase()}
							</p>
							<p>{formatCurrency(budgetMonth.amount)}</p>
						</div>
					))}
					<ListTransactionsComponent
						transactions={budget?.transactions}
						loading={getBudget.isLoading}
					/>
				</Section>
			</div>
		</>
	);
};

export default DetailBudgetPage;
