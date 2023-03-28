import styles from '../styles/protected-route.module.css';
import { useAuthenticationStatus } from '@nhost/react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './spinner';
import { ReactNode, Fragment } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className={styles.container}>
				<Spinner />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" state={{ from: location }} replace />;
	}

	return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
