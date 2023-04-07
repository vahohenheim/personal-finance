import classNames from 'classnames';
import { FC, ReactNode, createElement } from 'react';
import styles from './title.module.css';

const TitleComponent: FC<{
	heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
	children: ReactNode;
	className?: string;
	action?: ReactNode;
	center?: ReactNode;
}> = ({ heading = 'h1', children, className, action, center = false }) => {
	const titleComponent = createElement(heading, {}, children);

	return (
		<div
			className={classNames(
				styles.title,
				{ [styles.center]: center },
				className
			)}
		>
			{titleComponent}
			{action}
		</div>
	);
};

export default TitleComponent;
