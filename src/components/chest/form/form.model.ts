import { FormInstance } from 'antd/es/form/Form';
import { Chest } from '../../../gql/graphql';

export type FormChestValues = {
	icon: string;
	label: string;
	amount: number;
	start_at: string;
	end_at: string;
};

export type FormChestComponentProps = {
	onFinish: (values: FormChestValues) => void;
	form: FormInstance<FormChestValues>;
	chest?: Chest;
	submitLabel: string;
	submitting: boolean;
};
