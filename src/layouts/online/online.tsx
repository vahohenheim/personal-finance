import HeaderLayout from '../header/header';
import {
	Outlet,
	ScrollRestoration,
	useLocation,
	useOutlet,
} from 'react-router-dom';
import styles from './online.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { NavigationLayout } from '../navigation/navigation';

const AnimatedOutlet: FC = () => {
	const o = useOutlet();
	const [outlet] = useState(o);
	return <>{outlet}</>;
};

const OnlineLayout = () => {
	const location = useLocation();

	return (
		<div className={styles.container}>
			<HeaderLayout />
			{/*<AnimatePresence mode="wait">
				<motion.main
					className={styles.main}
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1 }}
				>
					<Outlet />
				</motion.main>
			</AnimatePresence>*/}
			<main className={styles.main}>
				<Outlet />
			</main>
			<NavigationLayout></NavigationLayout>
			<ScrollRestoration
				getKey={(currentLocation) => currentLocation.key}
			/>
		</div>
	);
};

export default OnlineLayout;
