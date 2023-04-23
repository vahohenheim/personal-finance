import SectionComponent from '../../components/section/section';
import { CompanyIcon } from '../../icons/company';
import { TransactionIcon } from '../../icons/transaction';
import styles from './datas.module.css';
import { ItemLinkComponent } from '../../components/link/item/item';

export const DatasPage = () => {
	return (
		<div className="container center-block">
			<SectionComponent className={styles.list}>
				<ItemLinkComponent
					icon={<TransactionIcon />}
					label="transactions"
					to="/transactions"
				/>
				<ItemLinkComponent
					icon={<CompanyIcon />}
					label="companies"
					to="/companies"
				/>
			</SectionComponent>
		</div>
	);
};
