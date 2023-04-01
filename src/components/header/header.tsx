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
		setCurrent(location.pathname);
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
						<LinkComponent active={current === '/'} to={'/'}>
							🖥 dashboard
						</LinkComponent>
						<LinkComponent
							active={current === '/transactions'}
							to={'/transactions'}
						>
							💳 transactions
						</LinkComponent>
					</div>
					<div className={styles.right}>
						<Link to={'/profile'}>
							<div
								className={classNames(styles.profile, {
									[styles.active]: current === '/profile',
								})}
							></div>
						</Link>
					</div>
				</div>
			) : (
				<></>
			)}
		</header>
	);
};

export default Header;
