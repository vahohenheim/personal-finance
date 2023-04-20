import { useParams } from 'react-router-dom';
import type { Chest, Transaction } from '../../../gql/graphql';
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
import { ChestService } from '../../../services/chest';
import InfosComponent from '../../../components/infos/infos';
import { Info } from '../../../components/infos/infos.model';
import dayjs from 'dayjs';

const DetailChestPage = () => {
	const { id } = useParams();
	const getChest = useGetChest(id || '');
	const chest = getChest?.data?.chest[0];
	const amounts = ChestService.getChestAmounts(chest as Chest);
	const hasExpectedAmount = !!chest?.amount;
	const amount = amounts.savings - amounts.picks;

	const hasNoData =
		!getChest.isLoading &&
		(!getChest?.data?.chest || getChest?.data?.chest?.length === 0);

	if (hasNoData) {
		return <DetailEmptyComponent />;
	}

	const infos: Array<Info> = [
		{
			label: 'Start date',
			value: dayjs(chest?.start_at as string).format('DD MMMM YYYY'),
		},
		{
			label: 'End date',
			value: dayjs(chest?.end_at as string).format('DD MMMM YYYY'),
		},
	];

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
							{formatCurrency(amount)}
							{hasExpectedAmount ? (
								<span className={styles.expectedAmount}>
									/{formatCurrency(chest.amount)}
								</span>
							) : (
								''
							)}
						</>
					}
				/>
				<Section>
					<InfosComponent infos={infos}></InfosComponent>
				</Section>
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
