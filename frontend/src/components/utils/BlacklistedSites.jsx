import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './BlacklistedSites.module.css';

const BlacklistedSites = () => {
  const [sites, setSites] = useState([]);
  
  useEffect(() => {
    const reportsQuery = query(
      collection(db, 'reports'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
      const newSites = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.createdAt;
        let formattedDate;
        
        if (timestamp) {
          // Convert Firestore timestamp to JavaScript Date and format it
          const date = timestamp.toDate();
          formattedDate = date.toISOString().split('T')[0];
        } else {
          formattedDate = new Date().toISOString().split('T')[0];
        }

        return {
          id: doc.id,
          url: data.url || '',
          reportedAt: formattedDate,
          category: data.category || data.targetBrand || 'Other'
        };
      });
      setSites(newSites);
    }, (error) => {
      console.error("Error fetching reports:", error);
    });

    return () => unsubscribe();
  }, []);

  // Create duplicated list for seamless scrolling
  const allSites = [...sites, ...sites];

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