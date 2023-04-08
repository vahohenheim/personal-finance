import { FormInstance } from 'antd/es/form/Form';
import { Company } from '../../../gql/graphql';

export type FormCompanyValues = {
	label: string;
	logo: string;
};

export type FormCompanyComponentProps = {
	onFinish: (values: FormCompanyValues) => void;
	form: FormInstance<FormCompanyValues>;
	company?: Company;
	submitLabel: string;
};
