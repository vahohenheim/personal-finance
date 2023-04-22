import SectionComponent from '../../components/section/section';
import LinkComponent from '../../components/link/link';
import { CompanyIcon } from '../../icons/company';
import { TransactionIcon } from '../../icons/transaction';
import styles from './datas.module.css';
import TitleComponent from '../../components/title/title';
import { ArrowRightIcon } from '../../icons/arrow-right';

export const DatasPage = () => {
	return (
		<SectionComponent className={styles.list}>
			<TitleComponent heading="h1">Datas</TitleComponent>
			<LinkComponent className={styles.item} to="/transactions">
				<TransactionIcon />
				<p className={styles.label}>Transactions</p>
				<ArrowRightIcon />
			</LinkComponent>
			<LinkComponent className={styles.item} to="/companies">
				<CompanyIcon />
				<p className={styles.label}>Companies</p>
				<ArrowRightIcon />
			</LinkComponent>
		</SectionComponent>
	);
};
