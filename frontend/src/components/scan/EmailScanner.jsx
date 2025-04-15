import { useState } from 'react';
import styles from './EmailScanner.module.css';

const EmailScanner = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const analyzeEmailContent = (content) => {
    const indicators = [];
    const contentLower = content.toLowerCase();
    
    // Check for urgent language
    if (contentLower.includes('urgent') || 
        contentLower.includes('immediate action') || 
        contentLower.includes('act now')) {
      indicators.push('Contains urgent language or time pressure tactics');
    }
    
    // Check for suspicious links
    if (contentLower.includes('click here') || 
        contentLower.includes('verify your account')) {
      indicators.push('Contains suspicious call-to-action links');
    }
    
    // Check for sensitive information requests
    if (contentLower.includes('password') || 
        contentLower.includes('credit card') || 
        contentLower.includes('ssn')) {
      indicators.push('Requests sensitive personal information');
    }
    
    // Check for generic greeting
    if (contentLower.includes('dear customer') || 
        contentLower.includes('dear user')) {
      indicators.push('Uses generic greeting instead of your name');
    }
    
    return indicators;
  };

  const handleEmailScanSubmit = async (e) => {
    e.preventDefault();
    const emailContent = e.target.elements.emailContent.value;
    
    if (!emailContent) return;
    
    setIsAnalyzing(true);
    setScanResult(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const indicators = analyzeEmailContent(emailContent);
      const score = 100 - (indicators.length * 15); // Each indicator reduces score
      const isSafe = score > 70;
      
      setScanResult({
        score,
        isSafe,
        indicators,
        message: isSafe 
          ? 'This email appears to be legitimate with low risk indicators.'
          : 'This email shows multiple signs of being a phishing attempt. Proceed with caution.'
      });
    } catch (error) {
      setScanResult({
        error: true,
        message: 'An error occurred while analyzing the email. Please try again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="email-scan" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge">Email Analysis</div>
          <h1>Email Scanner</h1>
          <p>Analyze suspicious emails to detect phishing attempts and social engineering tactics</p>
        </div>
        
        <div className={styles.scanGrid}>
          <div className="card glass-card">
            <div className="card-header">
              <h3><i className="fas fa-envelope"></i> Analyze Email Content</h3>
              <p>Paste the suspicious email content below</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleEmailScanSubmit} className={styles.scanForm}>
                <textarea 
                  name="emailContent"
                  placeholder="Paste email content here (including subject, sender, and body text)..." 
                  rows="8" 
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
                </button>
              </form>
              
              {isAnalyzing && (
                <div className={styles.scanningMessage}>
                  <p>Analyzing email content...</p>
                  <div className={styles.progressContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
              )}
              
              {scanResult && !scanResult.error && (
                <div className={`${styles.resultBox} ${scanResult.isSafe ? styles.safe : styles.unsafe}`}>
                  <div className={styles.resultHeader}>
                    <i className={`fas ${scanResult.isSafe ? 'fa-check-circle' : 'fa-exclamation-triangle'} ${scanResult.isSafe ? styles.safe : styles.unsafe}`}></i>
                    <h4>{scanResult.isSafe ? 'Low Risk Email' : 'Potential Phishing Email'}</h4>
                  </div>
                  
                  <div className={styles.scoreContainer}>
                    <div className={styles.scoreLabel}>Safety Score</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className={styles.progressContainer} style={{ flexGrow: 1 }}>
                        <div 
                          className={`${styles.progressBar} ${scanResult.isSafe ? styles.safe : styles.unsafe}`}
                          style={{ width: `${scanResult.score}%` }}
                        />
                      </div>
                      <span className={styles.progressValue}>{Math.round(scanResult.score)}%</span>
                    </div>
                  </div>
                  
                  <p>{scanResult.message}</p>
                  
                  {scanResult.indicators.length > 0 && (
                    <div className={styles.indicators}>
                      <strong>Detected Indicators:</strong>
                      <ul>
                        {scanResult.indicators.map((indicator, index) => (
                          <li key={index}>
                            <i className="fas fa-exclamation-circle"></i>
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {scanResult?.error && (
                <div className={`${styles.resultBox} ${styles.unsafe}`}>
                  <div className={styles.resultHeader}>
                    <i className={`fas fa-exclamation-circle ${styles.unsafe}`}></i>
                    <h4>Error</h4>
                  </div>
                  <p>{scanResult.message}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card glass-card">
            <div className="card-header">
              <h3><i className="fas fa-exclamation-triangle"></i> Email Phishing Indicators</h3>
              <p>Common signs of phishing emails</p>
            </div>
            <div className="card-body">
              <ul className={styles.phishingSigns}>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Mismatched Sender</strong>
                    <p>Email address doesn't match the claimed organization</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Urgent Language</strong>
                    <p>Messages creating urgency or threatening negative consequences</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Suspicious Links</strong>
                    <p>Hover over links to see if they lead to unexpected destinations</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Requests for Information</strong>
                    <p>Legitimate organizations rarely request sensitive information via email</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Grammar & Spelling</strong>
                    <p>Professional organizations typically have proper grammar and spelling</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailScanner;