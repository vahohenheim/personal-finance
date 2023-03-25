import styles from '../styles/input.module.css';

const Input = ({ type = 'text', label = '', ...props }) => {
  return (
    <div className={styles.container}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input type={type} className={styles.input} onChange={(e) => console.log('e', e)} {...props} />
    </div>
  );
};

export default Input;