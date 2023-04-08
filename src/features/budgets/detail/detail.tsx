import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import type { Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import { ListTransactionsComponent } from '../../../components/transaction';
import { Button } from 'antd';
import { BudgetIconComponent } from '../../../components/budget';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import classNames from 'classnames';
import { useGetBudget } from '../api/get-budget.hook';

/*
{
  transaction(where: {date: {_gte: "2023-04-01T00:00:00.000000+00:00", _lte: "2023-05-01T00:00:00.000000+00:00"}}) {
    date
  }
}
*/

const DetailBudgetPage = () => {
	const { id } = useParams();
	const getBudget = useGetBudget(id || '');
	const budget = getBudget?.data?.budget[0];

	if (getBudget.isLoading) {
		return <div>Loading...</div>;
	}

	const aggregateAmountTransactions = (
		sum: number,
		transaction: Transaction
	) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	};

	const amountTransactions = budget?.transactions.reduce(
		aggregateAmountTransactions,
		0
	);

	const percent =
		((amountTransactions || 0) * 100) / budget?.budget_months[0]?.amount;

	return (
		<>
			<Helmet>
				<title>transaction {budget?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					className={classNames({ [styles.exceed]: percent > 100 })}
					backgroundColor={budget?.budget_type?.color || ''}
					icon={<BudgetIconComponent icon={budget?.icon || ''} />}
					title={budget?.label || ''}
					amount={
						<>
							<span>{formatCurrency(amountTransactions)}</span>
							<span className={styles.budgetAmount}>
								/
								{formatCurrency(
									budget?.budget_months[0]?.amount
								)}
							</span>
						</>
					}
				/>
				<Section>
					<ListTransactionsComponent
						transactions={budget?.transactions}
						loading={getBudget.isLoading}
					/>
				</Section>
				<Section className={styles.actions}>
					<LinkComponent to={`/budgets/${budget?.id as string}/edit`}>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
				</Section>
			</div>
		</>
	);
};

export default DetailBudgetPage;
