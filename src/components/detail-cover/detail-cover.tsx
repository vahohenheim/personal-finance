import classNames from 'classnames';
import { FC } from 'react';
import Section from '../section/section';
import TitleComponent from '../title/title';
import { DetailCoverComponentProps } from './detail-cover.model';
import styles from './detail-cover.module.css';
import { BackComponent } from '../back/back';
import { Skeleton } from 'antd';

export const DetailCoverComponent: FC<DetailCoverComponentProps> = ({
	icon,
	title,
	amount,
	className = '',
	backgroundColor = '',
	loading = false,
	hasBack = true,
}) => {
	return (
		<Section>
			{hasBack && <BackComponent />}
			<div
				className={classNames(styles.cover, className)}
				style={{
					backgroundColor,
				}}
			>
				<div className={styles.icon}>
					{loading ? (
						<Skeleton.Avatar active size="small"></Skeleton.Avatar>
					) : (
						icon
					)}
				</div>
				<TitleComponent
					heading="h2"
					center={true}
					className={styles.title}
				>
					{loading ? <Skeleton.Button active size="small" /> : title}
				</TitleComponent>
				{amount && (
					<TitleComponent
						heading="h2"
						center={true}
						className={styles.amount}
					>
						{loading ? (
							<Skeleton.Button active size="small" />
						) : (
							amount
						)}
					</TitleComponent>
				)}
			</div>
		</Section>
	);
};
