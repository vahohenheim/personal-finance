import styles from './footer.module.css';

const Footer = () => {
    return <footer className={styles.footer}>
        <div className={`container center-block ${styles.container}`}>
            <p className={styles.copyright}>Copyright © 2023 valentinbourreau. All rights reserved.</p>
        </div>
    </footer>
}

export default Footer;