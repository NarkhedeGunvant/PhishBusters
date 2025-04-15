import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <i className="fas fa-shield-alt"></i>
            <span>PhishBusters</span>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} PhishBusters. All rights reserved.
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;