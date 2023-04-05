import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './section.module.css';

const SectionComponent: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<section className={classNames(styles.section, className)}>
			{children}
		</section>
	);
};

export default SectionComponent;
