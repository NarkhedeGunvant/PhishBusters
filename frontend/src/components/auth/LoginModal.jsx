import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import toast from 'react-hot-toast';
import styles from './Modal.module.css';

const LoginModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  useEffect(() => {
    const toggleLogin = () => setIsVisible(prev => !prev);
    window.addEventListener('toggle-login', toggleLogin);
    return () => window.removeEventListener('toggle-login', toggleLogin);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      toast.success('Successfully logged in!');
      setIsVisible(false);
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        remember: false
      });
    } catch (error) {
      console.error('Login failed:', error);
      
      let errorMessage = 'An error occurred during login. Please try again.';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
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
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formOptions}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
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