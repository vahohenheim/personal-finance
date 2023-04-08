import classNames from 'classnames';
import { FC } from 'react';
import Section from '../section/section';
import TitleComponent from '../title/title';
import { DetailCoverComponentProps } from './detail-cover.model';
import styles from './detail-cover.module.css';
import { BackComponent } from '../back/back';

export const DetailCoverComponent: FC<DetailCoverComponentProps> = ({
	icon,
	title,
	amount,
	className = '',
	backgroundColor = '',
}) => {
	return (
		<Section>
			<BackComponent />
			<div
				className={classNames(styles.cover, className)}
				style={{
					backgroundColor,
				}}
			>
				<div className={styles.icon}>{icon}</div>
				<TitleComponent
					heading="h2"
					center={true}
					className={styles.title}
				>
					{title}
				</TitleComponent>
				<TitleComponent
					heading="h2"
					center={true}
					className={styles.amount}
				>
					{amount}
				</TitleComponent>
			</div>
		</Section>
	);
};
