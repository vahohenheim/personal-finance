import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
} from 'antd';
import type { Budget, Chest, Company } from '../../../gql/graphql';
import { FormTransactionComponentProps } from './form.model';
import { FC, useState } from 'react';
import { TransactionType } from '../../../models/transaction';
import dayjs from 'dayjs';

export const FormTransactionComponent: FC<FormTransactionComponentProps> = ({
	onFinish,
	form,
	transaction,
	submitLabel,
	budgets = [],
	companies = [],
	chests = [],
	submitting = false,
	editing = false,
}) => {
	const [transactionType, setTransactionType] = useState<TransactionType>(
		transaction?.transaction_type as TransactionType
	);
	const initialValues = Object.assign({}, transaction);

	const companiesItems = companies.map((company: Company) => ({
		label: company.label,
		value: company.id,
	}));

	const budgetsItems = budgets.map((budget: Budget) => ({
		label: `${budget.icon} ${budget.label}`,
		value: budget.id,
	}));

	const chestsItems = chests.map((chest: Chest) => ({
		label: `${chest.icon} ${chest.label}`,
		value: chest.id,
	}));

	if (initialValues?.date) {
		initialValues.date = dayjs(initialValues.date);
	}

	const onChange = (changedValues: Record<string, any>) => {
		if (changedValues.transaction_type) {
			setTransactionType(changedValues.transaction_type);
		}
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
			disabled={submitting}
			onValuesChange={onChange}
		>
			{!editing ? (
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
						<Radio.Button value={TransactionType.SAVING}>
							{TransactionType.SAVING}
						</Radio.Button>
						<Radio.Button value={TransactionType.PICK}>
							{TransactionType.PICK}
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
			) : (
				''
			)}

			{[TransactionType.SPENT].includes(transactionType) ? (
				<Form.Item
					label="Select budget"
					name="budget_id"
					required={true}
				>
					<Select
						showSearch
						size="large"
						placeholder="typing budget name"
						optionFilterProp="children"
						filterOption={(input, option) =>
							(option?.label || '')
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={budgetsItems}
					></Select>
				</Form.Item>
			) : (
				''
			)}
			{[TransactionType.SAVING, TransactionType.PICK].includes(
				transactionType
			) ? (
				<Form.Item label="Select chest" name="chest_id" required={true}>
					<Select
						showSearch
						size="large"
						placeholder="typing chest name"
						optionFilterProp="children"
						filterOption={(input, option) =>
							(option?.label || '')
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={chestsItems}
					></Select>
				</Form.Item>
			) : (
				''
			)}
			{![TransactionType.SAVING].includes(transactionType) ? (
				<Form.Item
					label="Select company"
					name="company_id"
					required={true}
				>
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
			) : (
				''
			)}
			{![TransactionType.SAVING].includes(transactionType) ? (
				<Form.Item label="Define label" name="label" required={true}>
					<Input
						size="large"
						placeholder="typing transaction label"
					/>
				</Form.Item>
			) : (
				''
			)}

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
					loading={submitting}
				>
					{submitLabel}
				</Button>
			</Form.Item>
		</Form>
	);
};
