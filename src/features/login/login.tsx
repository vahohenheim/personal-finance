import styles from './login.module.css';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import {
	LockOutlined,
	UserOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-hot-toast';
import SectionComponent from '../../components/section/section';

const LoginPage = () => {
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
		toast.error(error?.message || '', {
			id: 'login-failed',
		});
	}

	const disableForm = isLoading || needsEmailVerification;

	const onFinish = (values: { email: string; password: string }) => {
		signInEmailPassword(values.email, values.password).then(() => {
			toast('Welcome back', {
				id: 'welcome-back',
				icon: '👋',
				duration: 1500,
			});
		});
	};

	if (needsEmailVerification) {
		toast(
			'Please check your mailbox and follow the verification link to verify your email.',
			{
				id: 'email-verification',
			}
		);
	}

	return (
		<SectionComponent>
			<Form
				name="login"
				className={styles.form}
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your email',
						},
					]}
				>
					<Input
						size="large"
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
						size="large"
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
						size="large"
						type="primary"
						htmlType="submit"
						loading={isLoading}
						block={true}
					>
						access to your account
					</Button>
				</Form.Item>

				<Form.Item>
					<Link to="/register">
						<Button size="large" type="link" block={true}>
							create a account
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</SectionComponent>
	);
};

export default LoginPage;
