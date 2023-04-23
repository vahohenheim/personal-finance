import { toast } from 'react-hot-toast';
import { Form } from 'antd';
import {
	FormTransactionComponent,
	FormTransactionValues,
} from '../../../components/transaction';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import dayjs from 'dayjs';
import { TransactionType } from '../../../models/transaction';
import { useInsertTransaction } from '../../../api/transaction/insert-transaction.hook';
import { useGetCompanyItems } from '../../../api/company/get-company-items.hook';
import { useGetBudgetItems } from '../../../api/budget/get-budget-items.hook';
import { FormSkeletonTransactionComponent } from '../../../components/transaction/form/form.skeleton';
import { useGetChestItems } from '../../../api/chest/get-chest-items.hook';
import styles from '../../../components/back/back.module.css';
import { ArrowLeftIcon } from '../../../icons/arrow-left';
import { FC, useEffect, useState } from 'react';
import { formatInsertableDate } from '../../../utils/format-insertable-date';
import { AddTransactionPageProps } from './add.model';
import { AddCompanyTransaction } from '../add-company/add-company';

const AddTransactionPage: FC<AddTransactionPageProps> = ({ handleBack }) => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const [requestCompany, setRequestCompany] = useState<string>('');
	const [needNewCompany, setNeedNewCompany] = useState<boolean>(false);
	const insertTransaction = useInsertTransaction(userId);
	const getCompanies = useGetCompanyItems();
	const getBudgets = useGetBudgetItems();
	const getChests = useGetChestItems();
	const companies = getCompanies?.data?.company || [];
	const budgets = getBudgets?.data?.budget || [];
	const chests = getChests?.data?.chest || [];
	const loading =
		getBudgets.isLoading || getCompanies.isLoading || getChests.isLoading;

	const onFinish = (values: FormTransactionValues) => {
		const requestCompanyFromCompanies = companies.find(
			(company) => company.label === values.company_id.trim()
		);

		if (requestCompanyFromCompanies) {
			insertTransaction.mutate({
				label: values.label,
				amount: values.amount,
				transaction_type: values.transaction_type,
				company_id: requestCompanyFromCompanies.id,
				budget_id: values.budget_id,
				chest_id: values.chest_id,
				date: formatInsertableDate(values.date),
			});
		} else {
			setRequestCompany(values.company_id);
			setNeedNewCompany(true);
		}
	};

	useEffect(() => {
		if (insertTransaction.data) {
			toast.success('Add transaction successfully', {
				id: 'transaction-added',
			});
			form.resetFields();
			handleBack();
		}

		if (insertTransaction.isError) {
			toast.error('Unable to add transaction', {
				id: 'transaction-added',
			});
			console.error(insertTransaction.error);
		}
	}, [insertTransaction.data, insertTransaction.isError]);

	return (
		<div className="container center-block">
			<SectionComponent>
				<div className={styles.back} onClick={handleBack}>
					<ArrowLeftIcon />
				</div>
				<TitleComponent heading="h2">Add a transaction</TitleComponent>
				{loading ? (
					<FormSkeletonTransactionComponent />
				) : (
					<FormTransactionComponent
						submitLabel={'add transaction'}
						onFinish={onFinish}
						form={form}
						budgets={budgets}
						companies={companies}
						chests={chests}
						transaction={{
							transaction_type: TransactionType.SPENT,
							budget_type: 'month',
							date: dayjs(),
						}}
						submitting={insertTransaction.isLoading}
					/>
				)}
			</SectionComponent>
			<AddCompanyTransaction
				open={needNewCompany}
				requestCompany={requestCompany}
				userId={userId}
				getCompanies={getCompanies}
				onSuccess={() => setNeedNewCompany(false)}
			/>
		</div>
	);
};

export default AddTransactionPage;
