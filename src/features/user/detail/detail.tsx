import type { Month } from '../../../gql/graphql';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link/link';
import InfosComponent from '../../../components/infos/infos';
import { Button, Form } from 'antd';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import SectionComponent from '../../../components/section/section';
import { useSignOut, useUserId } from '@nhost/react';
import { useGetUser } from '../../../api/user/get-user.hook';
import { AvatarUserComponent } from '../../../components/user/avatar/avatar';
import { queryClient } from '../../../utils/react-query-client';

const DetailUserPage = () => {
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const { signOut } = useSignOut();
	const user = getUser?.data?.user;
	const userMonth = user?.user_months || [];
	const currentUserMonth =
		userMonth.length > 0 ? userMonth[0] : { month: {} };
	const currentMonth = currentUserMonth?.month as Month;
	const metadata = user?.metadata as { firstName: string; lastName: string };

	const handleLogout = () => {
		signOut();
		queryClient.invalidateQueries(['user']);
	};

	return (
		<>
			<Helmet>
				<title>{user?.displayName || ''} profile - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					hasBack={false}
					loading={getUser.isLoading}
					icon={
						<AvatarUserComponent
							url={`url(${user?.avatarUrl || ''})`}
							loading={getUser.isLoading}
						/>
					}
					title={user?.displayName || ''}
				/>
				<SectionComponent>
					<InfosComponent
						infos={[
							{
								label: 'Firstname',
								value: metadata?.firstName,
							},
							{
								label: 'Lastname',
								value: metadata?.lastName,
							},
							{
								label: 'Current Month',
								value: dayjs(
									currentMonth?.start_at as string
								).format('MMMM YYYY'),
							},
						]}
					/>
				</SectionComponent>
				<SectionComponent className={styles.actions}>
					<LinkComponent to={`/user/edit`}>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
					<Button type="link" block={true} onClick={handleLogout}>
						logout
					</Button>
				</SectionComponent>
			</div>
		</>
	);
};

export default DetailUserPage;
