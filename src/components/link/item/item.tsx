import { FC } from 'react';
import { ItemLinkComponentProps } from './item.model';
import LinkComponent from '../link/link';
import { Card } from 'antd';
import styles from './item.module.css';

export const ItemLinkComponent: FC<ItemLinkComponentProps> = ({
	icon,
	label,
	to,
}) => {
	return (
		<LinkComponent className={styles.link} to={to}>
			<Card>
				<div className={styles.item}>
					<div className={styles.icon}>{icon}</div>
					<div className={styles.label}>{label}</div>
				</div>
			</Card>
		</LinkComponent>
	);
};
