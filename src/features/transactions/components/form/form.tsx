import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../../gql/gql';
import { gqlClient } from '../../../../utils/graphql-client';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
	Button,
	Form,
	Input,
	Radio,
	Select,
	InputNumber,
	DatePicker,
} from 'antd';
import type { Budget, Company } from '../../../../gql/graphql';
import dayjs from 'dayjs';
import { FormTransactionComponentProps } from './form.model';
import { FC } from 'react';

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

const FormTransactionComponent: FC<FormTransactionComponentProps> = ({
	onFinish,
	form,
}) => {
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

	const companiesItems = companies.map((company: Company) => ({
		label: company.label,
		value: company.id,
	}));

	const budgetsItems = budgets.map((budget: Budget) => ({
		label: budget.label,
		value: budget.id,
	}));

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				transaction_type: 'spent',
				budget_type: 'month',
			}}
			onFinish={onFinish}
		>
			<Form.Item label="Define transaction" name="transaction_type">
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
						(option?.label || '')
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
	);
};

export default FormTransactionComponent;
