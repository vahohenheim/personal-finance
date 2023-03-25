import styles from '../styles/spinner.module.css';

import classNames from 'classnames';

const Spinner = ({ size = '' }) => (
  <span
    className={classNames(
      size === 'sm' ? styles['spinner-sm'] : styles.spinner
    )}
  />
);

export default Spinner;