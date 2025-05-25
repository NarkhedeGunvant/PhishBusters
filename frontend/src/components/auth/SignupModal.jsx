import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../../firebase/config';
import toast from 'react-hot-toast';
import styles from './Modal.module.css';

const SignupModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  useEffect(() => {
    const toggleSignup = () => setIsVisible(prev => !prev);
    window.addEventListener('toggle-signup', toggleSignup);
    return () => window.removeEventListener('toggle-signup', toggleSignup);
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      // Prepare user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };

      toast.success('Account created successfully!');
      setIsVisible(false);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
      setIsVisible(false);
    } catch (error) {
      console.error('Signup failed:', error);
      
      let errorMessage = 'An error occurred during signup. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
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
          <h2>Create an Account</h2>
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
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>
            
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
            
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  required
                />
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