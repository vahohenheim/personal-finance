import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './link.module.css';

const LinkComponent: FC<{
	children: ReactNode;
	className?: string;
	active?: boolean;
	to?: string;
	onClick?: () => void;
}> = ({ children, className, to, active = false }) => {
	if (!to) {
		return (
			<p
				className={classNames(
					styles.link,
					{ [styles.active]: active },
					className
				)}
			>
				{children}
			</p>
		);
	}

	return (
		<Link
			className={classNames(
				styles.link,
				{ [styles.active]: active },
				className
			)}
			to={to}
		>
			{children}
		</Link>
	);
};

export default LinkComponent;
