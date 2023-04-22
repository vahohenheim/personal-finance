import type { FC } from 'react';
import styles from './header.module.css';
import classNames from 'classnames';
import { Button, Drawer } from 'antd';
import { TransactionIcon } from '../../icons/transaction';
import { useState } from 'react';
import AddTransactionPage from '../../features/transactions/add/add';

const HeaderLayout: FC = () => {
	const [open, setOpen] = useState(false);

	const handleShow = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<header className={styles.header}>
			<div
				className={classNames(
					styles.container,
					'container center-block'
				)}
			>
				<Button
					type="primary"
					size="middle"
					onClick={handleShow}
					icon={<TransactionIcon width={20} height={20} />}
				>
					Add a transaction
				</Button>
			</div>
			<Drawer
				placement="bottom"
				closable={false}
				open={open}
				onClose={handleClose}
			>
				<AddTransactionPage handleBack={handleClose} />
			</Drawer>
		</header>
	);
};

export default HeaderLayout;
