import { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const LoginModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const toggleLogin = () => setIsVisible(prev => !prev);
    window.addEventListener('toggle-login', toggleLogin);
    return () => window.removeEventListener('toggle-login', toggleLogin);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsVisible(false);
      // In a real app, you would handle the authentication here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.modal} ${styles.active}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Login to PhishBusters</h2>
          <button 
            className={styles.closeModal} 
            onClick={() => setIsVisible(false)}
          >
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" required />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" required />
              </div>
            </div>
            
            <div className={styles.formOptions}>
              <div className={styles.checkbox}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className={styles.forgotPassword}>Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className={styles.authRedirect}>
            Don't have an account? {' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(false);
                window.dispatchEvent(new CustomEvent('toggle-signup'));
              }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;