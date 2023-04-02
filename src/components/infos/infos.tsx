import { FC } from 'react';
import { InfosComponentProps } from './infos.model';
import styles from './infos.module.css';

const InfosComponent: FC<InfosComponentProps> = ({ infos }) => {
	return (
		<div className={styles.container}>
			{infos.map((info, index) => (
				<div key={index} className={styles.info}>
					<p>{info.label}</p>
					<p>{info.value}</p>
				</div>
			))}
		</div>
	);
};

export default InfosComponent;
