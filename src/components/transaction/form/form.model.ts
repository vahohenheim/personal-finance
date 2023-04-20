import { FormInstance } from 'antd/es/form/Form';
import { Dayjs } from 'dayjs';
import { Budget, Chest, Company, Maybe } from '../../../gql/graphql';

export type FormTransactionValues = {
	label: Maybe<string>;
	transaction_type: string;
	budget_type: string;
	chest_id: string;
	budget_id: string;
	company_id: string;
	date: string | Dayjs;
	amount: number;
};

export type FormTransactionComponentProps = {
	onFinish: (values: FormTransactionValues) => void;
	form: FormInstance<FormTransactionValues>;
	transaction?: Partial<FormTransactionValues>;
	budgets?: Array<Budget>;
	companies?: Array<Company>;
	chests?: Array<Chest>;
	submitLabel: string;
	submitting: boolean;
	editing?: boolean;
};
