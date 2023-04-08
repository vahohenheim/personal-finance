import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql';
import { gqlClient } from '../../../utils/graphql-client';
import {
	Button,
	Form,
	Input,
	Radio,
	Select,
	InputNumber,
	DatePicker,
} from 'antd';
import type { Budget, Company } from '../../../gql/graphql';
import { FormTransactionComponentProps } from './form.model';
import { FC } from 'react';
import { TransactionType } from '../../../models/transaction';
import dayjs from 'dayjs';

const GET_COMPANY_QUERY = graphql(`
	query GetLiteCompanies($limit: Int!) {
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
			icon
		}
	}
`);

export const FormTransactionComponent: FC<FormTransactionComponentProps> = ({
	onFinish,
	form,
	transaction,
	submitLabel,
	loading = false,
}) => {
	const initialValues = Object.assign({}, transaction);

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

	const companies = getCompanies?.data?.company || [];
	const budgets = getBudgets?.data?.budget || [];

	const transformCompanyToSelectItem = (company: Company) => ({
		label: company.label,
		value: company.id,
	});

	const transformBudgetToSelectItem = (budget: Budget) => ({
		label: `${budget.icon} ${budget.label}`,
		value: budget.id,
	});

	const companiesItems = companies.map(transformCompanyToSelectItem);
	const budgetsItems = budgets.map(transformBudgetToSelectItem);

	if (initialValues?.date) {
		initialValues.date = dayjs(initialValues.date);
	}

	if (getCompanies.isLoading || getBudgets.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
			disabled={loading}
		>
			<Form.Item label="Define transaction" name="transaction_type">
				<Radio.Group size="large">
					<Radio.Button value={TransactionType.SPENT}>
						{TransactionType.SPENT}
					</Radio.Button>
					<Radio.Button value={TransactionType.ENTRY}>
						{TransactionType.ENTRY}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Select budget" name="budget_id">
				<Select
					showSearch
					size="large"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.label || '')
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={budgetsItems}
				></Select>
			</Form.Item>
			<Form.Item label="Select company" name="company_id">
				<Select
					showSearch
					size="large"
					placeholder="typing company name"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.label || '')
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={companiesItems}
				/>
			</Form.Item>
			<Form.Item label="Define label" name="label">
				<Input size="large" placeholder="typing transaction label" />
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
					size="large"
					placeholder="typing date"
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					block
					htmlType="submit"
					size="large"
					loading={loading}
				>
					{submitLabel}
				</Button>
			</Form.Item>
		</Form>
	);
};
