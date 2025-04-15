import { useState } from 'react';
import styles from './URLScanner.module.css';

const URLScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScanSubmit = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    
    if (!url) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const score = Math.random() * 100;
      const isSafe = score > 70;
      
      setScanResult({
        score,
        isSafe,
        message: isSafe 
          ? 'This URL appears to be legitimate. No phishing indicators detected.'
          : 'This URL shows signs of being a phishing attempt. Proceed with caution.'
      });
    } catch (error) {
      setScanResult({
        error: true,
        message: 'An error occurred while scanning the URL. Please try again.'
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section id="scan" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge">URL Analysis</div>
          <h1>URL Scanner</h1>
          <p>Check if a URL is legitimate or a phishing attempt with our AI-powered scanner</p>
        </div>
        
        <div className={styles.scanGrid}>
          <div className="card glass-card">
            <div className="card-header">
              <h3><i className="fas fa-link"></i> Scan URL</h3>
              <p>Enter any suspicious URL to analyze</p>
            </div>
            <div className="card-body">
              <form id="scan-form" className={styles.scanForm} onSubmit={handleScanSubmit}>
                <input 
                  type="url" 
                  name="url"
                  placeholder="Enter URL to scan (e.g., https://example.com)" 
                  required 
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block" 
                  disabled={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Scan URL'}
                </button>
              </form>
              
              {isScanning && (
                <div className={styles.scanningMessage}>
                  <p>Analyzing URL...</p>
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
                    <h4>{scanResult.isSafe ? 'Safe URL' : 'Potential Phishing'}</h4>
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
              <h3><i className="fas fa-exclamation-triangle"></i> How to Identify Phishing</h3>
              <p>Common signs of phishing websites</p>
            </div>
            <div className="card-body">
              <ul className={styles.phishingSigns}>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Suspicious URLs</strong>
                    <p>Look for misspellings or extra characters in domain names</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Poor Design</strong>
                    <p>Legitimate sites usually have professional design and no spelling errors</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Urgent Requests</strong>
                    <p>Be wary of sites creating urgency or threatening consequences</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Unsecured Connection</strong>
                    <p>Check for HTTPS and a padlock icon in the address bar</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Unusual Requests</strong>
                    <p>Legitimate sites won't ask for sensitive information via email</p>
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

export default URLScanner;