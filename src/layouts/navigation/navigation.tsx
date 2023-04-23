import LinkComponent from '../../components/link/link/link';
import styles from './navigation.module.css';
import { BoardIcon } from '../../icons/board';
import { BudgetIcon } from '../../icons/budget';
import { ChestIcon } from '../../icons/chest';
import { DatasIcon } from '../../icons/data';
import { User } from '../../models/user';
import { AvatarUserComponent } from '../../components/user/avatar/avatar';
import { useEffect, useState } from 'react';
import { useAuthenticationStatus, useUserId } from '@nhost/react';
import { useLocation } from 'react-router-dom';
import { useGetUser } from '../../api/user/get-user.hook';

export const NavigationLayout = () => {
	const [current, setCurrent] = useState('/');
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const id = useUserId() as string;
	const location = useLocation();
	const getUser = useGetUser(id);

	const user = !!id && isAuthenticated ? getUser.data?.user : {};

	useEffect(() => {
		setCurrent(location.pathname.split('/')[1]);
	}, [location]);

	return (
		<div className={styles.navigation}>
			<div className="container center-block">
				<div className={styles.menu}>
					<LinkComponent active={current === ''} to="/">
						<div className={styles.icon}>
							<BoardIcon />
						</div>
						<div className={styles.label}>board</div>
					</LinkComponent>
					<LinkComponent active={current === 'budgets'} to="/budgets">
						<div className={styles.icon}>
							<BudgetIcon />
						</div>
						<div className={styles.label}>budget</div>
					</LinkComponent>
					<LinkComponent active={current === 'chests'} to="/chests">
						<div className={styles.icon}>
							<ChestIcon />
						</div>
						<div className={styles.label}>chest</div>
					</LinkComponent>
					<LinkComponent
						active={['datas', 'transactions', 'companies'].includes(
							current
						)}
						to="/datas"
					>
						<div className={styles.icon}>
							<DatasIcon />
						</div>
						<div className={styles.label}>datas</div>
					</LinkComponent>
					<LinkComponent active={current === 'user'} to="/user">
						<div className={styles.icon}>
							<AvatarUserComponent
								url={`url(${(user as User)?.avatarUrl || ''})`}
								loading={getUser.isLoading || isLoading}
								active={current === 'user'}
								width={24}
								height={24}
							/>
						</div>
						<div className={styles.label}>profil</div>
					</LinkComponent>
				</div>
			</div>
		</div>
	);
};
