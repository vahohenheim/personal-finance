import { Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AddCompanyTransactionProps } from './add-company.model';
import { toast } from 'react-hot-toast';
import { useInsertCompany } from '../../../api/company/insert-company.hook';

export const AddCompanyTransaction: FC<AddCompanyTransactionProps> = ({
	open = false,
	requestCompany,
	userId,
	getCompanies,
	onSuccess,
}) => {
	const [openCreateCompanyConfirm, setOpenCreateCompanyConfirm] =
		useState(false);
	const insertCompany = useInsertCompany(userId);

	useEffect(() => {
		if (insertCompany.data) {
			toast.success('Add company successfully', {
				id: 'company-added',
			});
			setOpenCreateCompanyConfirm(false);
			getCompanies.refetch();
			onSuccess();
		}

		if (insertCompany.isError) {
			toast.error('Unable to add company', {
				id: 'company-added',
			});
			console.error(insertCompany.error);
		}
	}, [insertCompany.data, insertCompany.isError]);

	useEffect(() => {
		setOpenCreateCompanyConfirm(open);
	}, [open]);

	const handleOkCreateCompanyConfirm = () => {
		insertCompany.mutate({
			label: requestCompany,
			logo: '',
		});
	};

	return (
		<Modal
			title={`"${requestCompany}" company doesn't exist, do you want to create it ?`}
			centered={true}
			closable={false}
			confirmLoading={insertCompany.isLoading}
			open={openCreateCompanyConfirm}
			onOk={handleOkCreateCompanyConfirm}
			onCancel={() => setOpenCreateCompanyConfirm(false)}
		></Modal>
	);
};
