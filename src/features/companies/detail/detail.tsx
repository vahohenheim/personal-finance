import { useParams } from 'react-router-dom';
import type { Transaction } from '../../../gql/graphql';
import TitleComponent from '../../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import { ListTransactionsComponent } from '../../../components/transaction';
import { Button } from 'antd';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import { formatCurrency } from '../../../utils/format-currency';
import { IconCompanyComponent } from '../../../components/company';
import { useGetCompany } from '../../../api/company/get-company.hook';
import { DetailEmptyComponent } from '../../../components/detail-empty/detail-empty';

const DetailCompanyPage = () => {
	const { id } = useParams();
	const getCompany = useGetCompany(id || '');
	const company = getCompany?.data?.company[0];

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

	const hasNoData =
		!getCompany.isLoading &&
		(!getCompany?.data?.company || getCompany?.data?.company?.length === 0);

	if (hasNoData) {
		return <DetailEmptyComponent />;
	}

	return (
		<>
			<Helmet>
				<title>company {company?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					loading={getCompany.isLoading}
					icon={<IconCompanyComponent />}
					title={company?.label as string}
					amount={<>{formatCurrency(amountTransactions)}</>}
				/>
				<Section className={styles.actions}>
					<LinkComponent
						to={`/companies/${company?.id as string}/edit`}
					>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
				</Section>
				<Section>
					<TitleComponent heading="h3">Transactions</TitleComponent>
					<ListTransactionsComponent
						transactions={company?.transactions}
						loading={getCompany.isLoading}
					/>
				</Section>
			</div>
		</>
	);
};

export default DetailCompanyPage;
