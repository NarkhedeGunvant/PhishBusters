import { useState } from 'react';
import styles from './EmailScanner.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmailScanner = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const formatAnalysis = (analysis) => {
    const sections = {
      riskScore: null,
      specificConcerns: [],
      concernsNotFound: [],
      overallAssessment: ''
    };

    // Extract risk score
    const scoreMatch = analysis.match(/Risk Score: (\d+)\/10/);
    if (scoreMatch) {
      sections.riskScore = parseInt(scoreMatch[1]);
    }

    // Split the text into sections
    const lines = analysis.split('\n');
    let currentSection = '';

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('**Specific Concerns Found:**')) {
        currentSection = 'concerns';
      } else if (trimmedLine.startsWith('**Concerns NOT found:**')) {
        currentSection = 'notFound';
      } else if (trimmedLine.startsWith('**Overall Assessment:**')) {
        currentSection = 'overall';
      } else if (trimmedLine) {
        if (currentSection === 'concerns' && trimmedLine.match(/^\d+\./)) {
          sections.specificConcerns.push(trimmedLine.replace(/^\d+\.\s*/, ''));
        } else if (currentSection === 'notFound' && trimmedLine.startsWith('*')) {
          sections.concernsNotFound.push(trimmedLine.replace(/^\*\s*/, ''));
        } else if (currentSection === 'overall') {
          sections.overallAssessment += trimmedLine + ' ';
        }
      }
    });

    return sections;
  };

  const renderAnalysisSection = (title, items, icon) => (
    <div className={styles.analysisSection}>
      <h4>
        <i className={`fas ${icon}`}></i> {title}
      </h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <i className="fas fa-exclamation-circle"></i>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const handleEmailScanSubmit = async (e) => {
    e.preventDefault();
    const emailContent = e.target.elements.emailContent.value;
    
    if (!emailContent) return;
    
    setIsAnalyzing(true);
    setScanResult(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/scan/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailContent })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze email');
      }

      const data = await response.json();
      const formattedAnalysis = formatAnalysis(data.analysis);
      
      setScanResult({
        score: data.confidence,
        isSafe: !data.isMalicious,
        riskScore: formattedAnalysis.riskScore,
        specificConcerns: formattedAnalysis.specificConcerns,
        concernsNotFound: formattedAnalysis.concernsNotFound,
        overallAssessment: formattedAnalysis.overallAssessment,
        analysis: data.analysis
      });
    } catch (error) {
      console.error('Error analyzing email:', error);
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
                    <div className={styles.scoreLabel}>Risk Score</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className={styles.progressContainer} style={{ flexGrow: 1 }}>
                        <div 
                          className={`${styles.progressBar} ${scanResult.riskScore <= 5 ? styles.safe : styles.unsafe}`}
                          style={{ width: `${(scanResult.riskScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className={styles.progressValue}>{scanResult.riskScore}/10</span>
                    </div>
                  </div>

                  {scanResult.specificConcerns.length > 0 && (
                    renderAnalysisSection('Specific Concerns Found', scanResult.specificConcerns, 'fa-exclamation-triangle')
                  )}

                  {scanResult.concernsNotFound.length > 0 && (
                    renderAnalysisSection('Concerns Not Found', scanResult.concernsNotFound, 'fa-check')
                  )}

                  {scanResult.overallAssessment && (
                    <div className={styles.analysisSection}>
                      <h4>
                        <i className="fas fa-info-circle"></i> Overall Assessment
                      </h4>
                      <p>{scanResult.overallAssessment}</p>
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