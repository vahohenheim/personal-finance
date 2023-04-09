import { useNavigate, useParams } from 'react-router-dom';
import type { Transaction } from '../../../gql/graphql';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/format-currency';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
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
import { useDeleteTransactions } from '../api/delete-transaction.hook';
import { useGetTransaction } from '../api/get-transaction.hook';
import { TransactionEntryIconComponent } from '../../../components/transaction';

const DetailTransactionPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
	const deleteTransaction = useDeleteTransactions(id || '');
	const getTransaction = useGetTransaction(id || '');
	const transaction = getTransaction?.data?.transaction[0];
	const budgetColor = transaction?.budget?.budget_type?.color as string;
	const isEntry = transaction?.transaction_type === TransactionType.ENTRY;

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

	const getTransactionInfos = (transactionInfos?: Transaction) => {
		const infos = [
			{
				label: 'date',
				value: dayjs(transactionInfos?.date as string).format(
					'DD MMMM YYYY'
				),
			},
			{
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
			},
		];

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
					className={classNames({
						[styles.entry]: isEntry,
					})}
					icon={
						isEntry ? (
							<TransactionEntryIconComponent />
						) : (
							<LinkComponent
								to={`/budgets/${
									transaction?.budget?.id as string
								}`}
							>
								<BudgetIconComponent
									icon={transaction?.budget?.icon || ''}
									color={budgetColor}
								/>
							</LinkComponent>
						)
					}
					title={transaction?.label || ''}
					amount={
						<>
							{isEntry ? '+' : '-'}{' '}
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
