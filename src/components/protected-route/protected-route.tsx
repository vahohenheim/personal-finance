import { useAuthenticationStatus } from '@nhost/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SpinnerComponent from '../spinner/spinner';
import styles from './protected-route.module.css';
import { motion } from 'framer-motion';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuthenticationStatus();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<SpinnerComponent size={45} />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Outlet />
		</motion.div>
	);
};

export default ProtectedRoute;
