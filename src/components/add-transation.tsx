import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { graphql } from '../gql/gql';
import { gqlClient } from '../utils/graphql-client';
import { queryClient } from '../utils/react-query-client';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import { User } from '../user.model';

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

	const [amount, setAmount] = useState(0);
	const [label, setLabel] = useState('');
	const [budgetId, setBudgetId] = useState('month');

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log('e', e, amount, label, budgetId);

		if (!amount || !label || !budgetId) {
			return;
		}

		try {
			const transaction = { label, amount, budget_id: budgetId };
			const insert = insertTransaction.mutate(transaction);
			console.log('insert', insert);
			setAmount(0);
			setLabel('');
			setBudgetId('month');
			toast.success('Add transaction successfully', {
				id: 'addTransaction',
			});
		} catch (error) {
			toast.error('Unable to add transation', { id: 'addTransaction' });
			console.error(error);
		}
	};

	return (
		<div>
			<h2>New Transaction</h2>
			<div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Transaction
						</label>
						<div className="mt-1">
							<input
								type="text"
								placeholder="Label"
								value={label}
								onChange={(e) => setLabel(e.target.value)}
							/>
							<input
								type="number"
								placeholder="Amount"
								value={amount}
								onChange={(e) =>
									setAmount(Number(e.target.value))
								}
							/>
							<select
								onChange={(e) => setBudgetId(e.target.value)}
							>
								<option value="month">Month</option>
								<option value="annual">Annual</option>
								<option value="Project">Project</option>
							</select>
						</div>
					</div>
					<div>
						<button
							type="submit"
							disabled={insertTransaction.isLoading}
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTransaction;
