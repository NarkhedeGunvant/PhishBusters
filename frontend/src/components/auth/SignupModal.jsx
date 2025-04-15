import { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const SignupModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const toggleSignup = () => setIsVisible(prev => !prev);
    window.addEventListener('toggle-signup', toggleSignup);
    return () => window.removeEventListener('toggle-signup', toggleSignup);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsVisible(false);
      // In a real app, you would handle the account creation here
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.modal} ${styles.active}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Create an Account</h2>
          <button 
            className={styles.closeModal} 
            onClick={() => setIsVisible(false)}
          >
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Full Name" required />
              </div>
            </div>
            
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
            
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password" required />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.checkbox}>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className={styles.authRedirect}>
            Already have an account? {' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(false);
                window.dispatchEvent(new CustomEvent('toggle-login'));
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;