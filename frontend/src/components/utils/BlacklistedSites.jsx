import { useState } from 'react';
import styles from './BlacklistedSites.module.css';

const BLACKLISTED_SITES = [
  { url: "fake-paypa1.com", reportedAt: "2025-03-12", category: "Financial" },
  { url: "amaz0n-security-alert.net", reportedAt: "2025-03-11", category: "E-commerce" },
  { url: "g00gle-verify.com", reportedAt: "2025-03-10", category: "Tech" },
  { url: "bank0famerica-secure.com", reportedAt: "2025-03-09", category: "Banking" },
  { url: "netfl1x-account-update.com", reportedAt: "2025-03-08", category: "Entertainment" }
];

const BlacklistedSites = () => {
  // Create duplicated list for seamless scrolling
  const allSites = [...BLACKLISTED_SITES, ...BLACKLISTED_SITES];

  return (
    <div className={styles.section}>
      <div className="container">
        <div className="section-header">
          <div className="badge">Threat Intelligence</div>
          <h2>Recently Blacklisted Sites</h2>
          <p>These websites have been reported and verified as phishing attempts</p>
        </div>
        
        <div className="card glass-card">
          <div className={styles.header}>
            <div className={styles.title}>
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Live Threat Feed</h3>
            </div>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.financial}`}></span>
                Financial
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.ecommerce}`}></span>
                E-commerce
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.social}`}></span>
                Social Media
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.other}`}></span>
                Other
              </span>
            </div>
          </div>
          
          <div className={styles.container}>
            <div className={styles.scrollContainer}>
              {allSites.map((site, index) => {
                let categoryClass = styles.other;
                if (['Financial', 'Banking'].includes(site.category)) {
                  categoryClass = styles.financial;
                } else if (['E-commerce', 'Entertainment'].includes(site.category)) {
                  categoryClass = styles.ecommerce;
                } else if (site.category === 'Social Media') {
                  categoryClass = styles.social;
                }

                return (
                  <div key={index} className={styles.site}>
                    <div>
                      <div className={styles.siteUrl}>{site.url}</div>
                      <div className={styles.siteDate}>
                        Reported: {site.reportedAt}
                      </div>
                    </div>
                    <div className={`${styles.category} ${categoryClass}`}>
                      {site.category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlacklistedSites;