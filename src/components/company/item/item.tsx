import { Card } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ItemCompanyComponentProps } from './item.model';
import styles from './item.module.css';
import { IconCompanyComponent } from '../icon/icon';

export const ItemCompanyComponent: FC<ItemCompanyComponentProps> = ({
	company,
}) => {
	return (
		<Link className={styles.link} to={`/companies/${company.id as string}`}>
			<Card className={styles.card}>
				<div className={styles.body}>
					<div className={styles.content}>
						<IconCompanyComponent />
						<div className={styles.title}>
							<p className={styles.label}>{company?.label}</p>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
};
