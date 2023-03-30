import { FC, ReactNode } from 'react';
import styles from './section.module.css';

const Section: FC<{ children: ReactNode }> = ({ children }) => {
	return <section className={styles.section}>{children}</section>;
};

export default Section;
