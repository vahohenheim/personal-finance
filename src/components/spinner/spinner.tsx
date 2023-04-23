import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './spinner.module.css';

const SpinnerComponent: FC<{ size?: number }> = ({ size = 24 }) => {
	const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

	return (
		<div className={styles.spinner}>
			<div className={styles.logo}>
				<p className={styles.icon}>🏛</p>
				<Spin indicator={antIcon} />
			</div>
			<p className={styles.label}>finance</p>
		</div>
	);
};

export default SpinnerComponent;
