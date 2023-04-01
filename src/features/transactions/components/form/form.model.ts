import { FormInstance } from 'antd/es/form/Form';

export type FormTransactionValues = {
	label: string;
	transaction_type: string;
	budget_type: string;
	budget_id: string;
	company_id: string;
	date: string;
	amount: number;
};

export type FormTransactionComponentProps = {
	onFinish: (values: FormTransactionValues) => void;
	form: FormInstance<FormTransactionValues>;
};
