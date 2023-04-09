import { FC } from 'react';
import SpinnerComponent from '../../spinner/spinner';
import styles from './avatar.module.css';

export const AvatarSkeletonUserComponent: FC = () => {
	return (
		<div className={styles.avatar}>
			<SpinnerComponent />
		</div>
	);
};
