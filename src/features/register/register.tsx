import { useSignUpEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import styles from './register.module.css';
import { toast } from 'react-hot-toast';
import FooterLayout from '../../layouts/footer/footer';
import SectionComponent from '../../components/section/section';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
	const {
		signUpEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignUpEmailPassword();

	if (needsEmailVerification) {
		toast(
			'Please check your mailbox and follow the verification link to verify your email.',
			{
				id: 'email-verification',
			}
		);
	}

	if (isError) {
		toast.error('Unable to add user', {
			id: 'user-added',
		});
		console.error(error);
	}

	if (isSuccess) {
		return <Navigate to="/login" replace={true} />;
	}

	const disableForm = isLoading || needsEmailVerification;

	const onFinish = (values: {
		firstName: string;
		lastName: string;
		email: string;
		'new-password': string;
	}) => {
		void signUpEmailPassword(values.email, values['new-password'], {
			displayName: `${values.firstName} ${values.lastName}`.trim(),
			metadata: {
				firstName: values.firstName,
				lastName: values.lastName,
			},
		});
	};

	return (
		<>
			<Helmet>
				<title>register | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<Form
						name="register"
						layout="vertical"
						className={styles.form}
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item
							label="firstname"
							name="firstName"
							rules={[
								{
									required: true,
									message: 'Please input your firstname',
								},
							]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							label="lastname"
							name="lastName"
							rules={[
								{
									required: true,
									message: 'Please input your lastname',
								},
							]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							label="mail address"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email',
								},
							]}
						>
							<Input size="large" disabled={disableForm} />
						</Form.Item>
						<Form.Item
							label="password"
							name="new-password"
							rules={[
								{
									required: true,
									message: 'Please input your password',
								},
							]}
						>
							<Input.Password
								size="large"
								disabled={disableForm}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={isLoading}
								block={true}
								size="large"
							>
								create a account
							</Button>
						</Form.Item>
						<Form.Item>
							<Link to="/login">
								<Button type="link" block={true} size="large">
									connexion
								</Button>
							</Link>
						</Form.Item>
					</Form>
				</SectionComponent>
			</div>
		</>
	);
};

export default RegisterPage;
