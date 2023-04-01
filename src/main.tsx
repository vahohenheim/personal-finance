import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import { useUserId } from '@nhost/react';
import { User } from './user.model';
import Footer from './components/footer/footer';
import { graphql } from './gql';
import { gqlClient } from './utils/graphql-client';
import toast from 'react-hot-toast';
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

const Main: FC = () => {
	const id = useUserId() as string;

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
		onSuccess: () => {
			toast('Welcome back', {
				id: 'welcome-back',
				icon: '👋',
				duration: 1500,
			});
		},
	});

	const user = data?.user;

	return (
		<>
			<Header user={user} />
			<main className="main">
				{error ? (
					<p>Something went wrong. Try to refresh the page.</p>
				) : (
					<Outlet context={{ user }} />
				)}
			</main>
			<Footer />
		</>
	);
};

export default Main;
