import { FC } from 'react';
import styles from './saving-icon.module.css';
import { SAVING_ICON } from '../../../constants/saving';

export const TransactionSavingIconComponent: FC = () => {
	return (
		<div className={styles.saving}>
			<div className={styles.background}></div>
			<div className={styles.icon}>{SAVING_ICON}</div>
		</div>
	);
};
