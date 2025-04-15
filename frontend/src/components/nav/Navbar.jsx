import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo}>
          <i className="fas fa-shield-alt"></i>
          PhishBusters
        </Link>
        <nav>
          <ul className={styles.navLinks}>
            <li><Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link></li>
            <li><Link to="/scan" className={location.pathname === '/scan' ? styles.active : ''}>URL Scanner</Link></li>
            <li><Link to="/email-scan" className={location.pathname === '/email-scan' ? styles.active : ''}>Email Scanner</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? styles.active : ''}>Blog</Link></li>
            <li><Link to="/report" className={location.pathname === '/report' ? styles.active : ''}>Report</Link></li>
          </ul>
        </nav>
        <div className={styles.authButtons}>
          <button className="btn btn-outline" id="login-btn">Login</button>
          <button className="btn btn-primary" id="signup-btn">Sign Up</button>
        </div>
        <div className={styles.mobileMenuBtn}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;