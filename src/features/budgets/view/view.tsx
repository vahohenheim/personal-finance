import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { graphql } from '../../../gql/gql';
import type { Budget } from '../../../gql/graphql';
import { gqlClient } from '../../../utils/graphql-client';
import { ListBudgetComponent } from '../../../components/budget/list/list';

const GET_BUDGETS_QUERY = graphql(`
	query GetMonthBudgets($limit: Int!) {
		budget(order_by: { priority: asc }, limit: $limit) {
			budget_months {
				amount
				month {
					start_at
					end_at
				}
			}
			id
			label
			priority
			icon
			transactions(order_by: { date: desc }) {
				amount
				budget {
					id
					label
					icon
					budget_type {
						color
					}
					budget_months {
						amount
						month {
							start_at
							end_at
						}
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

const ViewBudgetsPage = () => {
	const getBudgets = useQuery({
		queryKey: ['month-budgets'],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_BUDGETS_QUERY, { limit: 100 });
		},
	});

	return (
		<>
			<Helmet>
				<title>budgets | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/budgets/add">
								<Button type="primary" block={true}>
									Add budget
								</Button>
							</Link>
						}
					>
						Budgets
					</TitleComponent>
					<ListBudgetComponent
						budgets={getBudgets.data?.budget}
						loading={getBudgets.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewBudgetsPage;
