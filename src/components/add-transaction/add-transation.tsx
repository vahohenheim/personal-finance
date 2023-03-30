import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import { User } from '../../user.model';
import { Button, Form, Input, Radio, Select, InputNumber } from 'antd';

const INSERT_TRANSACTION_MUTATION = graphql(`
	mutation InsertTransaction($transaction: transactions_insert_input!) {
		insert_transactions(objects: [$transaction]) {
			affected_rows
			returning {
				id
				amount
				budget_id
				label
				type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

const AddTransaction = () => {
	const { user } = useOutletContext<{ user: User }>();
	const [form] = Form.useForm();

	const insertTransaction = useMutation({
		mutationFn: (transaction: {
			amount: number;
			budget_id: string;
			label: string;
		}) => {
			return gqlClient.request(INSERT_TRANSACTION_MUTATION, {
				transaction: {
					amount: transaction.amount,
					budget_id: transaction.budget_id,
					label: transaction.label,
					type: 'test',
					user_id: user?.id,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['transactions']);
		},
	});

	const onFinish = (values: {
		label: string;
		transation_type: string;
		budget_type: string;
		budget_id: string;
		company_id: string;
		amount: number;
	}) => {
		try {
			const transaction = {
				label: values.label,
				amount: values.amount,
				budget_id: values.budget_id,
			};
			insertTransaction.mutate(transaction);
			toast.success('Add transaction successfully', {
				id: 'addTransaction',
			});
			form.resetFields();
		} catch (error) {
			toast.error('Unable to add transation', { id: 'addTransaction' });
			console.error(error);
		}
	};

	return (
		<div>
			<h2>New Transaction</h2>
			<div>
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						transation_type: 'spent',
						budget_type: 'month',
					}}
					onFinish={onFinish}
				>
					<Form.Item
						label="Define transaction"
						name="transation_type"
					>
						<Radio.Group>
							<Radio.Button value="spent">spent</Radio.Button>
							<Radio.Button value="entry">entry</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Select type" name="budget_type">
						<Radio.Group>
							<Radio.Button value="month">month</Radio.Button>
							<Radio.Button value="annual">annual</Radio.Button>
							<Radio.Button value="project">project</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Select budget" name="budget_id">
						<Select>
							<Select.Option value="demo">Demo</Select.Option>
							<Select.Option value="demo2">Demo2</Select.Option>
							<Select.Option value="demo3">Demo3</Select.Option>
						</Select>
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
							options={[
								{
									value: 'jack',
									label: 'Jack',
								},
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'tom',
									label: 'Tom',
								},
							]}
						/>
					</Form.Item>
					<Form.Item label="Define label" name="label">
						<Input placeholder="typing transaction label" />
					</Form.Item>
					<Form.Item label="Amount" name="amount">
						<InputNumber placeholder="typing transaction label" />
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
