import styles from './Hero.module.css';
import BlacklistedSites from '../utils/BlacklistedSites';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    navigate(`/${section}`);
  };

  return (
    <>
      <div className={styles.hero}>
        <div className={`container ${styles.container}`}>
          <div className={styles.heroContent}>
            <div className="badge">AI-Powered Protection</div>
            <h1>Defend Against Phishing Attacks</h1>
            <p>Our advanced AI tools help you identify malicious URLs and suspicious emails to keep you safe online. Scan any link or analyze email content for instant threat detection.</p>
            <div className={styles.heroButtons}>
              <button 
                className="btn btn-primary btn-lg" 
                onClick={() => handleNavigate('scan-url')}
              >
                Scan URL <i className="fas fa-arrow-right"></i>
              </button>
              <button 
                className="btn btn-secondary btn-lg" 
                onClick={() => handleNavigate('scan-email')}
              >
                Analyze Email <i className="fas fa-envelope"></i>
              </button>
            </div>
          </div>
          <div className={styles.securityGraphic}>
            <div className={styles.shieldContainer}>
              <i className="fas fa-shield-alt"></i>
              <div className={styles.pulse}></div>
            </div>
            <div className={styles.securityLines}>
              <div className={`${styles.line} ${styles.line1}`}></div>
              <div className={`${styles.line} ${styles.line2}`}></div>
              <div className={`${styles.line} ${styles.line3}`}></div>
            </div>
          </div>
        </div>
      </div>
      <BlacklistedSites />
    </>
  );
};

export default Hero;