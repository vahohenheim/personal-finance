import { FormInstance } from 'antd/es/form/Form';

export type FormCompanyValues = {
	label: string;
	logo: string;
};

export type FormCompanyComponentProps = {
	onFinish: (values: FormCompanyValues) => void;
	form: FormInstance<FormCompanyValues>;
	initialValues?: Partial<FormCompanyValues>;
};
