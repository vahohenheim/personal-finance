import { useNavigate, useParams } from 'react-router-dom';
import type { Transaction } from '../../../gql/graphql';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/format-currency';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link/link';
import InfosComponent from '../../../components/infos/infos';
import { Button, Modal } from 'antd';
import { TransactionType } from '../../../models/transaction';
import { DetailCoverComponent } from '../../../components/detail-cover/detail-cover';
import { BudgetIconComponent } from '../../../components/budget';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import SectionComponent from '../../../components/section/section';
import { DetailEmptyComponent } from '../../../components/detail-empty/detail-empty';
import { useDeleteTransactions } from '../../../api/transaction/delete-transaction.hook';
import { useGetTransaction } from '../../../api/transaction/get-transaction.hook';
import { TransactionEntryIconComponent } from '../../../components/transaction';
import { ChestIconComponent } from '../../../components/chest/icon/icon';
import { TransactionSavingIconComponent } from '../../../components/transaction/saving-icon/saving-icon';
import { Info } from '../../../components/infos/infos.model';
import { formatDate } from '../../../utils/format-date';

const DetailTransactionPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
	const deleteTransaction = useDeleteTransactions(id || '');
	const getTransaction = useGetTransaction(id || '');
	const transaction = getTransaction?.data?.transaction[0];
	const budgetColor = transaction?.budget?.budget_type?.color as string;
	const associateIcon =
		transaction?.budget?.icon || transaction?.chest?.icon || '';
	const associateId = transaction?.budget?.id || transaction?.chest?.id || '';

	if (deleteTransaction.data) {
		toast.success('Delete transaction successfully', {
			id: 'transaction-deleted',
		});
		navigate(-1);
	}

	if (deleteTransaction.isError) {
		toast.error('Unable to delete transaction', {
			id: 'transaction-deleted',
		});
		console.error(deleteTransaction?.error);
	}

	const handleOkDeleteConfirm = () => {
		deleteTransaction.mutate(id || '');
		if (!deleteTransaction.isLoading && !!deleteTransaction.data) {
			setOpenDeleteConfirm(false);
			navigate(-1);
		}
	};

	const getTransactionIcon = (
		transaction_type: TransactionType,
		link = '',
		icon = '',
		budgetIconColor = ''
	) => {
		switch (transaction_type) {
			case TransactionType.SPENT:
				return (
					<LinkComponent to={`/budgets/${link}`}>
						<BudgetIconComponent
							icon={icon}
							color={budgetIconColor}
						/>
					</LinkComponent>
				);
			case TransactionType.PICK:
				return (
					<LinkComponent to={`/chests/${link}`}>
						<ChestIconComponent icon={icon} />
					</LinkComponent>
				);
			case TransactionType.ENTRY:
				return <TransactionEntryIconComponent />;
			case TransactionType.SAVING:
				return <TransactionSavingIconComponent />;
		}
	};

	const getTransactionInfos = (transactionInfos?: Transaction) => {
		const infos: Array<Info> = [
			{
				label: 'date',
				value: formatDate(transactionInfos?.date as string),
			},
		];

		if (transactionInfos?.transaction_type !== TransactionType.SAVING) {
			infos.push({
				label: 'company',
				value: (
					<LinkComponent
						active={true}
						to={`/companies/${
							transactionInfos?.company?.id as string
						}`}
					>
						{transactionInfos?.company?.label}
					</LinkComponent>
				),
			});
		}

		if (transactionInfos?.budget) {
			infos.push({
				label: 'budget',
				value: (
					<LinkComponent
						active={true}
						to={`/budgets/${transactionInfos?.budget_id as string}`}
					>
						{transactionInfos?.budget?.icon}{' '}
						{transactionInfos?.budget?.label}
					</LinkComponent>
				),
			});
		}

		if (transactionInfos?.chest) {
			infos.push({
				label: 'chest',
				value: (
					<LinkComponent
						active={true}
						to={`/chests/${transactionInfos?.chest_id as string}`}
					>
						{transactionInfos?.chest?.icon}{' '}
						{transactionInfos?.chest?.label}
					</LinkComponent>
				),
			});
		}

		return infos;
	};

	const infos = getTransactionInfos(transaction);

	const hasNoData =
		!getTransaction.isLoading &&
		(!getTransaction?.data?.transaction ||
			getTransaction?.data?.transaction?.length === 0);

	if (hasNoData) {
		return <DetailEmptyComponent />;
	}

	return (
		<>
			<Helmet>
				<title>transaction {transaction?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					loading={getTransaction.isLoading}
					className={classNames(
						styles[transaction?.transaction_type || '']
					)}
					icon={getTransactionIcon(
						transaction?.transaction_type as TransactionType,
						associateId,
						associateIcon,
						budgetColor
					)}
					title={transaction?.label || ''}
					amount={
						<>
							{[
								TransactionType.ENTRY,
								TransactionType.SAVING,
							].includes(
								transaction?.transaction_type as TransactionType
							)
								? '+'
								: '-'}{' '}
							{formatCurrency(transaction?.amount)}
						</>
					}
				/>
				<SectionComponent>
					<InfosComponent infos={infos} />
				</SectionComponent>
				<SectionComponent className={styles.actions}>
					<LinkComponent
						to={`/transactions/${transaction?.id as string}/edit`}
					>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
					<Button
						type="link"
						block={true}
						danger
						onClick={() => setOpenDeleteConfirm(true)}
					>
						delete
					</Button>
				</SectionComponent>
				<Modal
					title="Do you want to delete these transaction ?"
					centered={true}
					closable={false}
					confirmLoading={deleteTransaction.isLoading}
					open={openDeleteConfirm}
					onOk={handleOkDeleteConfirm}
					onCancel={() => setOpenDeleteConfirm(false)}
					okButtonProps={{ danger: true }}
				></Modal>
			</div>
		</>
	);
};

export default DetailTransactionPage;
