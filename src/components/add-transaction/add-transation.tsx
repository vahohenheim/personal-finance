import { useMutation, useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { User } from '../../user.model';
import {
	Button,
	Form,
	Input,
	Radio,
	Select,
	InputNumber,
	DatePicker,
} from 'antd';
import type {
	Budget,
	Company,
	Company_Insert_Input,
	Transaction_Insert_Input,
} from '../../gql/graphql';
import Title from '../title/title';
import dayjs from 'dayjs';

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

const GET_COMPANY_QUERY = graphql(`
	query GetCompanies($limit: Int!) {
		company(order_by: { label: asc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

const GET_BUDGET_QUERY = graphql(`
	query GetBudgets($limit: Int!) {
		budget(order_by: { label: asc }, limit: $limit) {
			id
			label
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
			}
		}
	}
`);

const AddTransaction = () => {
	const { user } = useOutletContext<{ user: User }>();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const insertTransaction = useMutation({
		mutationFn: (transaction: Transaction_Insert_Input) => {
			return gqlClient.request(INSERT_TRANSACTION_MUTATION, {
				transaction: {
					amount: transaction.amount,
					budget_id: transaction.budget_id,
					label: transaction.label,
					transaction_type: transaction.transaction_type,
					company_id: transaction.company_id,
					user_id: user?.id,
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

	const getCompanies = useQuery({
		queryKey: ['companies'],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_COMPANY_QUERY, { limit: 100 });
		},
	});

	const getBudgets = useQuery({
		queryKey: ['budgets'],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_BUDGET_QUERY, { limit: 100 });
		},
	});

	const onFinish = (values: {
		label: string;
		transaction_type: string;
		budget_type: string;
		budget_id: string;
		company_id: string;
		date: string;
		amount: number;
	}) => {
		try {
			console.log('values', values, dayjs.tz(values.date).format());
			const transaction: Transaction_Insert_Input = {
				label: values.label,
				amount: values.amount,
				transaction_type: values.transaction_type,
				company_id: values.company_id,
				budget_id: values.budget_id,
			};
			console.log('transaction', transaction);
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

	const companies = getCompanies?.data?.company || [];
	const budgets = getBudgets?.data?.budget || [];

	console.log(
		'datas',
		companies,
		budgets,
		getCompanies.data,
		getBudgets.data
	);

	const companiesItems = companies.map((company: Company) => ({
		label: company.label,
		value: company.id,
	}));

	const budgetsItems = budgets.map((budget: Budget) => ({
		label: budget.label,
		value: budget.id,
	}));

	return (
		<div>
			<Title heading="h2">Add a transaction</Title>
			<div>
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						transaction_type: 'spent',
						budget_type: 'month',
					}}
					onFinish={onFinish}
				>
					<Form.Item
						label="Define transaction"
						name="transaction_type"
					>
						<Radio.Group>
							<Radio.Button value="spent">spent</Radio.Button>
							<Radio.Button value="entry">entry</Radio.Button>
						</Radio.Group>
					</Form.Item>
					{/*<Form.Item label="Select type" name="budget_type">
						<Radio.Group>
							<Radio.Button value="month">month</Radio.Button>
							<Radio.Button value="annual">annual</Radio.Button>
							<Radio.Button value="project">project</Radio.Button>
						</Radio.Group>
					</Form.Item>*/}
					<Form.Item label="Select budget" name="budget_id">
						<Select options={budgetsItems}></Select>
					</Form.Item>
					<Form.Item label="Select company" name="company_id">
						<Select
							showSearch
							placeholder="typing company name"
							optionFilterProp="children"
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={companiesItems}
						/>
					</Form.Item>
					<Form.Item label="Define label" name="label">
						<Input placeholder="typing transaction label" />
					</Form.Item>
					<Form.Item label="Amount" name="amount">
						<InputNumber
							prefix="€"
							size="large"
							placeholder="typing transaction amount"
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item label="Date" name="date">
						<DatePicker
							defaultValue={dayjs()}
							placeholder="typing date"
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" block htmlType="submit">
							add transaction
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddTransaction;
