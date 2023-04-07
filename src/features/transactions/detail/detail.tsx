import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql';
import { gqlClient } from '../../../utils/graphql-client';
import type { Transaction } from '../../../gql/graphql';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/format-currency';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import InfosComponent from '../../../components/infos/infos';
import { Button } from 'antd';
import { TransactionType } from '../../../models/transaction';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import { BudgetIconComponent } from '../../../components/budget/icon/icon';
import classNames from 'classnames';

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

	const budgetColor = transaction?.budget?.budget_type?.color as string;
	const isEntry = transaction?.transaction_type === TransactionType.ENTRY;

	return (
		<>
			<Helmet>
				<title>transaction {transaction?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					className={classNames({
						[styles.entry]: isEntry,
					})}
					icon={
						isEntry ? (
							<BudgetIconComponent
								className={classNames({
									[styles.entryIcon]: isEntry,
								})}
								icon={
									isEntry
										? '⊕'
										: transaction?.budget?.icon || ''
								}
								color={budgetColor}
							/>
						) : (
							<LinkComponent
								to={`/budgets/${
									transaction?.budget?.id as string
								}`}
							>
								<BudgetIconComponent
									icon={
										isEntry
											? '⊕'
											: transaction?.budget?.icon || ''
									}
									color={budgetColor}
								/>
							</LinkComponent>
						)
					}
					title={transaction?.label || ''}
					amount={
						<>
							{isEntry ? '+' : '-'}{' '}
							{formatCurrency(transaction?.amount)}
						</>
					}
				/>
				<Section>
					<InfosComponent
						infos={[
							{
								label: 'date',
								value: dayjs(
									transaction?.date as string
								).format('DD MMMM YYYY'),
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
						]}
					/>
				</Section>
				<Section className={styles.actions}>
					<LinkComponent
						to={`/transactions/${transaction?.id as string}/edit`}
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

export default DetailTransactionPage;
