import { FC } from 'react';
import styles from './entry-icon.module.css';
import { ENTRY_ICON } from '../../../constants/entry';

export const TransactionEntryIconComponent: FC = () => {
	return (
		<div className={styles.entry}>
			<div className={styles.background}></div>
			<div className={styles.icon}>{ENTRY_ICON}</div>
		</div>
	);
};
