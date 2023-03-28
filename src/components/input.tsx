import { ChangeEvent, FC } from 'react';
import styles from '../styles/input.module.css';

const Input: FC<{
	type?: string;
	label?: string;
	value?: string;
	required?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ type = 'text', label = '', ...props }) => {
	return (
		<div className={styles.container}>
			{label ? <label className={styles.label}>{label}</label> : null}
			<input
				type={type}
				className={styles.input}
				onChange={(e) => console.log('e', e)}
				{...props}
			/>
		</div>
	);
};

export default Input;
