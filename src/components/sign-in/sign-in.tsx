import styles from './sign-in.module.css';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import {
	LockOutlined,
	UserOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const SignIn = () => {
	const {
		signInEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignInEmailPassword();

	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
	}

	if (isError) {
		return <p className={styles['error-text']}>{error?.message}</p>;
	}

	const disableForm = isLoading || needsEmailVerification;

	const onFinish = (values: { email: string; password: string }) => {
		console.log('Received values of form: ', values);
		signInEmailPassword(values.email, values.password);
	};

	if (needsEmailVerification) {
		<p className={styles['verification-text']}>
			Please check your mailbox and follow the verification link to verify
			your email.
		</p>;
	}

	return (
		<div>
			<div className={styles.logo}>
				<p>🏛</p>
				<p>finance</p>
			</div>
			<Form
				name="login"
				className={styles.form}
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="email"
					rules={[
						{ required: true, message: 'Please input your email' },
					]}
				>
					<Input
						prefix={<UserOutlined />}
						disabled={disableForm}
						placeholder="mail address"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password',
						},
					]}
				>
					<Input.Password
						prefix={<LockOutlined />}
						type="password"
						placeholder="password"
						iconRender={(visible: boolean) =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
						disabled={disableForm}
					/>
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
				<Form.Item>
					<Link to="/forgot-password">Forgot password</Link>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						className={styles.button}
					>
						access to your account
					</Button>
				</Form.Item>

				<Form.Item>
					Or <Link to="/sign-up">register now!</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SignIn;
