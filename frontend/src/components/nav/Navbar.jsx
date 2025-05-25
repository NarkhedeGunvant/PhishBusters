import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const handleLogin = () => {
    window.dispatchEvent(new CustomEvent('toggle-login'));
  };

  const handleSignup = () => {
    window.dispatchEvent(new CustomEvent('toggle-signup'));
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            <li><Link to="/scan-url" className={location.pathname === '/scan-url' ? styles.active : ''}>URL Scanner</Link></li>
            <li><Link to="/scan-email" className={location.pathname === '/email-scan' ? styles.active : ''}>Email Scanner</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? styles.active : ''}>Blog</Link></li>
            <li><Link to="/report" className={location.pathname === '/report' ? styles.active : ''}>Report</Link></li>
          </ul>
        </nav>
        <div className={styles.authButtons}>
          {user ? (
            <>
              <span className={styles.userName}>
                <i className="fas fa-user"></i>
                {user.displayName || user.email}
              </span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" id="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button className="btn btn-primary" id="signup-btn" onClick={handleSignup}>
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className={styles.mobileMenuBtn}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;