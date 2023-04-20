import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import { useGetUser } from '../../../api/user/get-user.hook';
import { useGetChests } from '../../../api/chest/get-chests.hook';
import { TotalChestsComponent } from '../../../components/chest/total/total';
import { ListChestComponent } from '../../../components/chest/list/list';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Info } from '../../../components/infos/infos.model';
import { ChestService } from '../../../services/chest';
import { formatCurrency } from '../../../utils/format-currency';
import InfosComponent from '../../../components/infos/infos';

const ViewChestsPage = () => {
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const getChests = useGetChests(100);
	const chests = getChests.data?.chest || [];
	const loading = getChests.isLoading || getUser.isLoading;
	const expectedAmount = ChestService.getChestsAmount(chests);
	const amount = ChestService.getChestsSavingAndPicks(chests);

	const infos: Array<Info> = [
		{
			label: 'Expected chests total',
			value: formatCurrency(expectedAmount),
		},
		{
			label: 'Needed rest',
			value: formatCurrency(expectedAmount - amount),
		},
	];

	return (
		<>
			<Helmet>
				<title>chests | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TotalChestsComponent loading={loading} chests={chests} />
				</SectionComponent>
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/chests/add">
								<Button type="primary" block={true}>
									Add a chest
								</Button>
							</Link>
						}
					>
						Chests
					</TitleComponent>
					<ListChestComponent chests={chests} loading={loading} />
				</SectionComponent>
				<SectionComponent>
					<InfosComponent infos={infos}></InfosComponent>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewChestsPage;
