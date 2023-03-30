import { Helmet } from 'react-helmet';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import type { User } from '../../user.model';
import { graphql } from '../../gql/gql';
import { useOutletContext } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Section from '../../components/section/section';

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

const ProfilePage = () => {
	const { user } = useOutletContext<{ user: User }>();

	const [mutateUser, { loading: updatingProfile }] =
		useMutation(UPDATE_USER_MUTATION);

	const onFinish = async (values: {
		firstName: string;
		lastName: string;
		email: string;
	}) => {
		try {
			await mutateUser({
				variables: {
					id: user?.id,
					displayName:
						`${values.firstName} ${values.lastName}`.trim(),
					metadata: {
						firstName: values.firstName,
						lastName: values.lastName,
					},
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
					<h2>Profile</h2>
					<div>
						<Form
							layout="vertical"
							initialValues={{
								firstName: user?.metadata?.firstName,
								lastName: user?.metadata?.lastName,
							}}
							onFinish={onFinish}
						>
							<Form.Item label="first name" name="firstName">
								<Input placeholder="typing transaction label" />
							</Form.Item>
							<Form.Item label="last name" name="lastName">
								<Input placeholder="typing transaction label" />
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
						</Form>
					</div>
				</Section>
			</div>
		</>
	);
};

export default ProfilePage;
