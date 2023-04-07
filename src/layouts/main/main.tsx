import HeaderLayout from '../header/header';
import {
	Outlet,
	ScrollRestoration,
	useMatches,
	useNavigation,
} from 'react-router-dom';
import FooterLayout from '../footer/footer';
import styles from './main.module.css';
import { useCallback } from 'react';

const MainLayout = () => {
	return (
		<div>
			<HeaderLayout />
			<main className={styles.main}>
				<Outlet />
			</main>
			<FooterLayout />
			<ScrollRestoration getKey={(location) => location.key} />
		</div>
	);
};

export default MainLayout;
