import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { User } from '../../user.model';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import classNames from 'classnames';
import LinkComponent from '../link/link';

const Header: FC<{ user: User }> = ({ user }) => {
	const [current, setCurrent] = useState('/');
	const location = useLocation();

	useEffect(() => {
		setCurrent(location.pathname.split('/')[1]);
	}, [location]);

	return (
		<header className={styles.header}>
			{user ? (
				<div
					className={classNames(
						styles.container,
						'container center-block'
					)}
				>
					<div className={styles.menu}>
						<Link to={'/user/edit'}>
							<div
								className={classNames(styles.profile, {
									[styles.active]: current === 'user',
								})}
							></div>
						</Link>
						<LinkComponent active={current === ''} to={'/'}>
							🖥&nbsp;dashboard
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
						<LinkComponent
							active={current === 'budgets'}
							to={'/budgets'}
						>
							💰&nbsp;budgets
						</LinkComponent>
					</div>
				</div>
			) : (
				<></>
			)}
		</header>
	);
};

export default Header;
