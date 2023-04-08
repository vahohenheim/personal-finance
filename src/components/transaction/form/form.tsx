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

export const FormTransactionComponent: FC<FormTransactionComponentProps> = ({
	onFinish,
	form,
	transaction,
	submitLabel,
	budgets = [],
	companies = [],
	loading = false,
}) => {
	const initialValues = Object.assign({}, transaction);

	const companiesItems = companies.map((company: Company) => ({
		label: company.label,
		value: company.id,
	}));

	const budgetsItems = budgets.map((budget: Budget) => ({
		label: `${budget.icon} ${budget.label}`,
		value: budget.id,
	}));

	if (initialValues?.date) {
		initialValues.date = dayjs(initialValues.date);
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
			disabled={loading}
		>
			<Form.Item
				label="Define transaction"
				name="transaction_type"
				required={true}
			>
				<Radio.Group size="large">
					<Radio.Button value={TransactionType.SPENT}>
						{TransactionType.SPENT}
					</Radio.Button>
					<Radio.Button value={TransactionType.ENTRY}>
						{TransactionType.ENTRY}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Select budget" name="budget_id" required={true}>
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
			<Form.Item label="Select company" name="company_id" required={true}>
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
			<Form.Item label="Define label" name="label" required={true}>
				<Input size="large" placeholder="typing transaction label" />
			</Form.Item>
			<Form.Item label="Amount" name="amount" required={true}>
				<InputNumber
					prefix="€"
					size="large"
					placeholder="typing transaction amount"
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item label="Date" name="date" required={true}>
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
