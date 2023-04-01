import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import type { User } from '../../../user.model';
import { graphql } from '../../../gql/gql';
import { useOutletContext } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Section from '../../../components/section/section';
import { useSignOut } from '@nhost/react';
import Title from '../../../components/title/title';
import { useMutation } from '@tanstack/react-query';
import { Users_Set_Input, Users_Update_Column } from '../../../gql/graphql';
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

const EditUserPage = () => {
	const { signOut } = useSignOut();
	const { user } = useOutletContext<{ user: User }>();

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
								<Input />
							</Form.Item>
							<Form.Item label="firstname" name="firstName">
								<Input />
							</Form.Item>
							<Form.Item label="lastname" name="lastName">
								<Input />
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									block={true}
								>
									update profile
								</Button>
							</Form.Item>
							<Form.Item>
								<Button
									type={'link'}
									block={true}
									onClick={() => signOut()}
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
