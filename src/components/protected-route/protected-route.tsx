import { useAuthenticationStatus } from '@nhost/react';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, Fragment } from 'react';
import SpinnerComponent from '../spinner/spinner';
import styles from './protected-route.module.css';
import classNames from 'classnames';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className={classNames(styles.loading, 'main')}>
				<SpinnerComponent />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
