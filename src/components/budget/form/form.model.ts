import { FormInstance } from 'antd/es/form/Form';
import { Budget_Month } from '../../../gql/graphql';

export type FormBudgetMonthValues = {
	amount: number;
};

export type FormBudgetMonthComponentProps = {
	onFinish: (values: FormBudgetMonthValues) => void;
	form: FormInstance<FormBudgetMonthValues>;
	budgetMonth?: Budget_Month;
	submitLabel?: string;
};
