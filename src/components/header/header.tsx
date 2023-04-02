import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { User } from '../../user.model';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import classNames from 'classnames';
import LinkComponent from '../link/link';
import { useUserId } from '@nhost/react';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { useQuery } from '@tanstack/react-query';

const GET_USER_QUERY = graphql(`
	query GetUser($id: uuid!) {
		user(id: $id) {
			id
			email
			displayName
			metadata
			avatarUrl
		}
	}
`);

const Header: FC = () => {
	const [current, setCurrent] = useState('/');
	const id = useUserId() as string;
	const location = useLocation();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['user'],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ user: User }, { id: string }>(
				GET_USER_QUERY,
				{
					id,
				}
			);
		},
	});

	const user = data?.user;

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
								style={{
									backgroundImage: `url(${
										user?.avatarUrl || ''
									})`,
								}}
							></div>
						</Link>
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
			) : (
				<></>
			)}
		</header>
	);
};

export default Header;
