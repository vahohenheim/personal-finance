import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import type { User } from '../../../user.model';
import { graphql } from '../../../gql';
import { Form, Input, Button } from 'antd';
import Section from '../../../components/section/section';
import { useSignOut, useUserId } from '@nhost/react';
import Title from '../../../components/title/title';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Users_Set_Input } from '../../../gql/graphql';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';

const UPDATE_USER_MUTATION = graphql(`
	mutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {
		updateUser(
			pk_columns: { id: $id }
			_set: { displayName: $displayName, metadata: $metadata }
		) {
			id
			displayName
			metadata
		}
	}
`);

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

const EditUserPage = () => {
	const { signOut } = useSignOut();
	const id = useUserId() as string;

	const getUser = useQuery({
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

	const user = getUser.data?.user;

	const updateUser = useMutation({
		mutationFn: (userUpdated: Users_Set_Input) => {
			return gqlClient.request(UPDATE_USER_MUTATION, {
				id: userUpdated.id,
				displayName: userUpdated.displayName || '',
				metadata: userUpdated.metadata,
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['user']);
		},
	});

	const onFinish = (values: {
		displayName: string;
		firstName: string;
		lastName: string;
	}) => {
		try {
			updateUser.mutate({
				id: user?.id,
				displayName: values.displayName,
				metadata: {
					firstName: values.firstName,
					lastName: values.lastName,
				},
			});
			toast.success('Updated successfully', { id: 'updateProfile' });
		} catch (error) {
			toast.error('Unable to update profile', { id: 'updateProfile' });
		}
	};

	return (
		<>
			<Helmet>
				<title>profile - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<Title heading="h2">Profile</Title>
					<div>
						<Form
							layout="vertical"
							initialValues={{
								displayName: user?.displayName,
								firstName: user?.metadata?.firstName,
								lastName: user?.metadata?.lastName,
							}}
							onFinish={onFinish}
						>
							<Form.Item label="display name" name="displayName">
								<Input size="large" />
							</Form.Item>
							<Form.Item label="firstname" name="firstName">
								<Input size="large" />
							</Form.Item>
							<Form.Item label="lastname" name="lastName">
								<Input size="large" />
							</Form.Item>
							<Form.Item>
								<Button
									size="large"
									type="primary"
									htmlType="submit"
									block={true}
								>
									update profile
								</Button>
							</Form.Item>
							<Form.Item>
								<Button
									size="large"
									type="link"
									block={true}
									onClick={() => {
										signOut();
										queryClient.invalidateQueries(['user']);
									}}
								>
									logout
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Section>
			</div>
		</>
	);
};

export default EditUserPage;
