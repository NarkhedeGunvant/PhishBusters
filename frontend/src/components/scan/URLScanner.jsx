import { useState } from 'react';
import styles from './URLScanner.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const URLScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleURLScanSubmit = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    
    if (!url) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/scan/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      
      if (!response.ok) throw new Error('Scan failed');
      
      const data = await response.json();
      
      // Ensure all required properties exist with defaults
      const details = data.details || {};
      const totalScans = details.totalScans || 0;
      const positiveScans = details.positiveScans || 0;
      const scanners = details.scanners || {};
      
      const score = totalScans > 0 
        ? Math.round(100 - (positiveScans / totalScans * 100))
        : 100; // Default to 100 if no scans

      setScanResult({
        url: data.url || url,
        score,
        isSafe: !data.isMalicious,
        confidence: data.confidence || 0,
        scanTime: new Date(data.scanTime || Date.now()),
        details: {
          totalScans,
          positiveScans,
          scanners
        },
        message: !data.isMalicious
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
    <section id="scan-url" className="section">
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
              <form id="scan-form" className={styles.scanForm} onSubmit={handleURLScanSubmit}>
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
                  
                  <div className={styles.tabs}>
                    <button 
                      className={activeTab === 'summary' ? styles.activeTab : ''} 
                      onClick={() => setActiveTab('summary')}
                    >
                      Summary
                    </button>
                    <button 
                      className={activeTab === 'details' ? styles.activeTab : ''} 
                      onClick={() => setActiveTab('details')}
                    >
                      Scan Details
                    </button>
                  </div>

                  {activeTab === 'summary' ? (
                    <>
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
                      <div className={styles.scanStats}>
                        <div>Total Scans: {scanResult.details.totalScans || 0}</div>
                        <div>Positive Detections: {scanResult.details.positiveScans || 0}</div>
                        <div>Scan Time: {scanResult.scanTime?.toLocaleString()}</div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.scannerDetails}>
                      <div className={styles.scannersList}>
                        {Object.entries(scanResult.details.scanners).map(([scanner, data]) => (
                          <div 
                            key={scanner} 
                            className={`${styles.scannerItem} ${
                              data?.result === 'clean site' ? styles.clean :
                              data?.result === 'unrated site' ? styles.unrated :
                              styles.detected
                            }`}
                          >
                            <div className={styles.scannerName}>
                              {scanner}
                            </div>
                            <div className={styles.scannerResult}>
                              {data?.result || 'unknown'}
                            </div>
                          </div>
                        ))}
                      </div>
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