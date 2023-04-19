import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { User } from '../../models/user';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import classNames from 'classnames';
import LinkComponent from '../../components/link/link';
import { useAuthenticationStatus, useUserId } from '@nhost/react';
import { useGetUser } from '../../api/user/get-user.hook';
import { AvatarUserComponent } from '../../components/user/avatar/avatar';
import { HEADER_NAVIGATION } from './header.constants';

const HeaderLayout: FC = () => {
	const [current, setCurrent] = useState('/');
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const id = useUserId() as string;
	const location = useLocation();
	const getUser = useGetUser(id);

	const user = !!id && isAuthenticated ? getUser.data?.user : {};

	useEffect(() => {
		setCurrent(location.pathname.split('/')[1]);
	}, [location]);

	if (!id || (!getUser.isLoading && Object.keys(user || {}).length === 0)) {
		return <header className={styles.header}></header>;
	}

	return (
		<header className={styles.header}>
			<div
				className={classNames(
					styles.container,
					'container center-block'
				)}
			>
				<div className={styles.logo}>🏛</div>
				<div className={styles.avatar}>
					<Link to={'/user'}>
						<AvatarUserComponent
							url={`url(${(user as User)?.avatarUrl || ''})`}
							loading={getUser.isLoading || isLoading}
							active={current === 'user'}
						/>
					</Link>
				</div>
				<div className={styles.menu}>
					{HEADER_NAVIGATION.map((item) => (
						<LinkComponent
							key={item.key}
							active={current === item.key}
							to={item.link}
						>
							{item.icon}&nbsp;{item.label}
						</LinkComponent>
					))}
				</div>
			</div>
		</header>
	);
};

export default HeaderLayout;
