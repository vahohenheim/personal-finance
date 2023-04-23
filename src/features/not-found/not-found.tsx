import { Helmet } from 'react-helmet';
import SectionComponent from '../../components/section/section';
import TitleComponent from '../../components/title/title';
import LinkComponent from '../../components/link/link/link';
import { Button } from 'antd';
import styles from './not-found.module.css';
import classNames from 'classnames';

export const NotFoundPage = () => {
	return (
		<>
			<Helmet>
				<title>Not found | finance</title>
			</Helmet>
			<div
				className={classNames(
					'container center-block',
					styles.container
				)}
			>
				<div className={styles.content}>
					<TitleComponent heading={'h1'} center={true}>
						Sh*t !
					</TitleComponent>
					<p className={styles.text}>Somthing go wrongs...</p>
					<p className={styles.text}>
						Don&apos;t worries, your money don&apos;t fly away
					</p>
				</div>
				<LinkComponent to={'/'}>
					<Button type="primary">Go to dashboard</Button>
				</LinkComponent>
			</div>
		</>
	);
};
