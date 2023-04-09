import HeaderLayout from '../header/header';
import {
	Outlet,
	ScrollRestoration,
	useLocation,
	useOutlet,
} from 'react-router-dom';
import FooterLayout from '../footer/footer';
import styles from './main.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

const AnimatedOutlet: FC = () => {
	const o = useOutlet();
	const [outlet] = useState(o);
	return <>{outlet}</>;
};

const MainLayout = () => {
	const location = useLocation();

	return (
		<div className={styles.container}>
			<HeaderLayout />
			<main className={styles.main}>
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<AnimatedOutlet />
					</motion.div>
				</AnimatePresence>
			</main>
			<FooterLayout />
			<ScrollRestoration
				getKey={(currentLocation) => currentLocation.key}
			/>
		</div>
	);
};

export default MainLayout;
