import { useSignUpEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import styles from './register.module.css';

const RegisterPage = () => {
	const {
		signUpEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignUpEmailPassword();

	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
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
		<div>
			<div className={styles.logo}>
				<p>🏛</p>
				<p>finance</p>
			</div>
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
					<Input />
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
					<Input />
				</Form.Item>
				<Form.Item
					label="mail address"
					name="email"
					rules={[
						{ required: true, message: 'Please input your email' },
					]}
				>
					<Input disabled={disableForm} />
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
					<Input.Password disabled={disableForm} />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						block={true}
					>
						create a account
					</Button>
				</Form.Item>
				<Form.Item>
					<Link to="/login">
						<Button type="link" block={true}>
							connexion
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RegisterPage;
