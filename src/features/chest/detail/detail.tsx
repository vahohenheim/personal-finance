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
import { DetailEmptyComponent } from '../../../components/detail-empty/detail-empty';
import { useGetChest } from '../../../api/chest/get-chest.hook';
import { ChestIconComponent } from '../../../components/chest/icon/icon';
import { DetailChestAmounts } from './detail.model';
import { TransactionType } from '../../../models/transaction';

const DetailChestPage = () => {
	const { id } = useParams();
	const getChest = useGetChest(id || '');
	const chest = getChest?.data?.chest[0];

	// TODO: move to service/chest.ts
	const aggregateAmountTransactions = (
		amounts: DetailChestAmounts,
		transaction: Transaction
	): DetailChestAmounts => {
		if (transaction.transaction_type === TransactionType.SAVING) {
			amounts.savings = (transaction.amount as number) + amounts.savings;
		}
		if (transaction.transaction_type === TransactionType.PICK) {
			amounts.picks = (transaction.amount as number) + amounts.picks;
		}
		return amounts;
	};

	const amountTransactions: DetailChestAmounts = (
		chest?.transactions || []
	).reduce(aggregateAmountTransactions, {
		picks: 0,
		savings: 0,
	});

	const hasNoData =
		!getChest.isLoading &&
		(!getChest?.data?.chest || getChest?.data?.chest?.length === 0);

	if (hasNoData) {
		return <DetailEmptyComponent />;
	}

	return (
		<>
			<Helmet>
				<title>chest {chest?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					loading={getChest.isLoading}
					icon={<ChestIconComponent icon={chest?.icon as string} />}
					title={chest?.label as string}
					amount={
						<>
							{formatCurrency(
								amountTransactions.savings -
									amountTransactions.picks
							)}
						</>
					}
				/>
				<Section className={styles.actions}>
					<LinkComponent to={`/chests/${chest?.id as string}/edit`}>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
				</Section>
				<Section>
					<TitleComponent heading="h3">Transactions</TitleComponent>
					<ListTransactionsComponent
						transactions={chest?.transactions}
						loading={getChest.isLoading}
					/>
				</Section>
			</div>
		</>
	);
};

export default DetailChestPage;
