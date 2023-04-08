import { FC } from 'react';
import styles from './entry-icon.module.css';

export const TransactionEntryIconComponent: FC = () => {
	return (
		<div className={styles.entry}>
			<div className={styles.background}></div>
			<div className={styles.icon}>⊕</div>
		</div>
	);
};
