import React, { FC, ReactNode } from 'react';
import styles from './title.module.css';

const TitleComponent: FC<{
	heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
	children: ReactNode;
	action?: ReactNode;
}> = ({ heading = 'h1', children, action }) => {
	const titleComponent = React.createElement(heading, {}, children);

	return (
		<div className={styles.title}>
			{titleComponent}
			{action}
		</div>
	);
};

export default TitleComponent;
