import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { User } from '../../user.model';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import classNames from 'classnames';
import LinkComponent from '../../components/link/link';
import { useAuthenticationStatus, useUserId } from '@nhost/react';
import SpinnerComponent from '../../components/spinner/spinner';
import { useGetUser } from '../../features/user/api/get-user.hook';

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

	const Avatar = () => {
		const avatarClassName = classNames(styles.avatar, {
			[styles.active]: current === 'user',
		});

		if (getUser.isLoading || isLoading) {
			return (
				<div className={avatarClassName}>
					<SpinnerComponent />
				</div>
			);
		}

		return (
			<div
				className={avatarClassName}
				style={{
					backgroundImage: `url(${(user as User)?.avatarUrl || ''})`,
				}}
			></div>
		);
	};

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
				<Link to={'/user/edit'}>
					<Avatar />
				</Link>

				<div className={styles.menu}>
					<LinkComponent active={current === ''} to={'/'}>
						🖥&nbsp;dashboard
					</LinkComponent>
					<LinkComponent
						active={current === 'budgets'}
						to={'/budgets'}
					>
						💰&nbsp;budgets
					</LinkComponent>
					<LinkComponent
						active={current === 'transactions'}
						to={'/transactions'}
					>
						💳&nbsp;transactions
					</LinkComponent>
					<LinkComponent
						active={current === 'companies'}
						to={'/companies'}
					>
						🏢&nbsp;companies
					</LinkComponent>
				</div>
			</div>
		</header>
	);
};

export default HeaderLayout;
