import { useAuthenticationStatus } from '@nhost/react';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, Fragment } from 'react';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const location = useLocation();

	if (isLoading) {
		return (
			<div>
				<Spin />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
