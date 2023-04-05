import classNames from 'classnames';
import { FC } from 'react';
import Section from '../section/section';
import TitleComponent from '../title/title';
import { DetailCoverComponentProps } from './detail-cover.model';
import styles from './detail-cover.module.css';

const DetailCoverComponent: FC<DetailCoverComponentProps> = ({
	icon,
	title,
	amount,
	className,
}) => {
	return (
		<Section>
			<div className={classNames(styles.cover, className as string)}>
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

export default DetailCoverComponent;
