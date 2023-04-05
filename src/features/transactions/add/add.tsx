import { useMutation } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import type {
	Company_Insert_Input,
	Transaction_Insert_Input,
} from '../../../gql/graphql';
import FormTransactionComponent from '../components/form/form';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import dayjs from 'dayjs';
import { FormTransactionValues } from '../components/form/form.model';
import { TransactionType } from '../../../models/transaction';

const INSERT_TRANSACTION_MUTATION = graphql(`
	mutation InsertTransaction($transaction: transaction_insert_input!) {
		insert_transaction(objects: [$transaction]) {
			affected_rows
			returning {
				id
				label
				amount
				budget_id
				company_id
				user_id
				transaction_type
				date
				created_at
				updated_at
			}
		}
	}
`);

const INSERT_COMPANY_MUTATION = graphql(`
	mutation InsertCompany($company: company_insert_input!) {
		insert_company(objects: [$company]) {
			affected_rows
			returning {
				id
				label
				logo
			}
		}
	}
`);

const AddTransactionPage = () => {
	const id = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const insertTransaction = useMutation({
		mutationFn: (transaction: Transaction_Insert_Input) => {
			return gqlClient.request(INSERT_TRANSACTION_MUTATION, {
				transaction: {
					amount: transaction.amount,
					budget_id: transaction.budget_id || null,
					label: transaction.label,
					transaction_type: transaction.transaction_type,
					company_id: transaction.company_id,
					user_id: id,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['transactions']);
		},
	});

	// TODO: if company don't exist, create it
	const insertCompany = useMutation({
		mutationFn: (company: Company_Insert_Input) => {
			return gqlClient.request(INSERT_COMPANY_MUTATION, {
				company: {
					label: company.label,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['companies']);
		},
	});

	const onFinish = (values: FormTransactionValues) => {
		try {
			const transaction: Transaction_Insert_Input = {
				label: values.label,
				amount: values.amount,
				transaction_type: values.transaction_type,
				company_id: values.company_id,
				budget_id: values.budget_id,
			};
			insertTransaction.mutate(transaction);
			toast.success('Add transaction successfully', {
				id: 'transaction-added',
			});
			form.resetFields();
			navigate(-1);
		} catch (error) {
			toast.error('Unable to add transation', {
				id: 'transaction-added',
			});
			console.error(error);
		}
	};

	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent heading="h2">
						Add a transaction
					</TitleComponent>
					<FormTransactionComponent
						onFinish={onFinish}
						form={form}
						initialValues={{
							transaction_type: TransactionType.SPENT,
							budget_type: 'month',
							date: dayjs(),
						}}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default AddTransactionPage;
