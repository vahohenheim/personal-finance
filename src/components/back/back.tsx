import styles from './back.module.css';
import { useNavigate } from 'react-router-dom';

export const BackComponent = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(-1);
	};

	return (
		<div className={styles.back} onClick={handleClick}>
			{'<'} back
		</div>
	);
};
