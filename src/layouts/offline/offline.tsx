import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './offline.module.css';
import { HeaderOfflineLayout } from '../header-offline/header-offline';
import FooterLayout from '../footer/footer';

const OfflineLayout = () => {
	return (
		<div className={styles.container}>
			<HeaderOfflineLayout />
			<main className={styles.main}>
				<Outlet />
			</main>
			<FooterLayout />
			<ScrollRestoration
				getKey={(currentLocation) => currentLocation.key}
			/>
		</div>
	);
};

export default OfflineLayout;
