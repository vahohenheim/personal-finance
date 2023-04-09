import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { Form, Input, Button } from 'antd';
import Section from '../../../components/section/section';
import { useSignOut, useUserId } from '@nhost/react';
import Title from '../../../components/title/title';
import { queryClient } from '../../../utils/react-query-client';
import { useGetUser } from '../api/get-user.hook';
import { useUpdateUser } from '../api/update-user.hook';
import { useNavigate } from 'react-router-dom';
import { BackComponent } from '../../../components/back/back';

const EditUserPage = () => {
	const { signOut } = useSignOut();
	const navigate = useNavigate();
	const id = useUserId() as string;
	const getUser = useGetUser(id);
	const user = getUser.data?.user;
	const updateUser = useUpdateUser();
	const metadata = user?.metadata as { firstName: string; lastName: string };

	if (updateUser.data) {
		toast.success('Edit user successfully', { id: 'user-edited' });
		navigate(-1);
	}

	if (updateUser.isError) {
		toast.error('Unable to edit user', {
			id: 'user-edited',
		});
		console.error(updateUser.error);
	}

	const onFinish = (values: {
		displayName: string;
		avatarUrl: string;
		firstName: string;
		lastName: string;
	}) => {
		updateUser.mutate({
			id: user?.id,
			displayName: values.displayName,
			avatarUrl: values.avatarUrl,
			metadata: {
				firstName: values.firstName,
				lastName: values.lastName,
			},
		});
	};

	return (
		<>
			<Helmet>
				<title>profile - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<BackComponent />
					<Title heading="h2">Profile</Title>
					<div>
						<Form
							layout="vertical"
							initialValues={{
								displayName: user?.displayName,
								avatarUrl: user?.avatarUrl,
								firstName: metadata.firstName,
								lastName: metadata.lastName,
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
							<Form.Item label="avatar" name="avatarUrl">
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
