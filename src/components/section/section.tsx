import { FC, ReactNode } from 'react';
import styles from './section.module.css';

export const SectionComponent: FC<{ children: ReactNode }> = ({ children }) => {
	return <section className={styles.section}>{children}</section>;
};
