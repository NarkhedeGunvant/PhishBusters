import { useState } from 'react';
import styles from './Report.module.css';

const Report = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    category: '',
    description: '',
    reporterEmail: '',
    targetBrand: '',
    dateDiscovered: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      setFormData({
        url: '',
        category: '',
        description: '',
        reporterEmail: '',
        targetBrand: '',
        dateDiscovered: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportAnother = () => {
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.card} ${styles.successCard}`}>
            <div className={styles.successIcon}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Thank You for Your Report!</h2>
            <p>Your contribution helps make the internet safer for everyone.</p>
            <div className={styles.nextSteps}>
              <h3>What happens next?</h3>
              <ol>
                <li>Our team will review your report within 24 hours</li>
                <li>The URL will be analyzed using our AI detection system</li>
                <li>If confirmed as phishing, it will be added to our database</li>
                <li>The site will be reported to relevant authorities</li>
              </ol>
            </div>
            <button 
              className={styles.reportAnotherButton}
              onClick={handleReportAnother}
            >
              Report Another Site
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Community Protection</div>
          <h1>Report Phishing Site</h1>
          <p>Help protect others by reporting suspicious or malicious websites</p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="url">Suspicious URL <span className={styles.required}>*</span></label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://suspicious-website.com"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category <span className={styles.required}>*</span></label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="banking">Banking/Financial</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Provider</option>
                    <option value="government">Government</option>
                    <option value="tech">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="targetBrand">Target Brand/Company</label>
                  <input
                    type="text"
                    id="targetBrand"
                    name="targetBrand"
                    value={formData.targetBrand}
                    onChange={handleChange}
                    placeholder="e.g., PayPal, Amazon, etc."
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Additional Details</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe how you found this site and why you believe it's phishing..."
                  rows="4"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="reporterEmail">Your Email (Optional)</label>
                  <input
                    type="email"
                    id="reporterEmail"
                    name="reporterEmail"
                    value={formData.reporterEmail}
                    onChange={handleChange}
                    placeholder="To receive updates about your report"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dateDiscovered">Date Discovered</label>
                  <input
                    type="date"
                    id="dateDiscovered"
                    name="dateDiscovered"
                    value={formData.dateDiscovered}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </form>
          </div>

          <div className={styles.infoCard}>
            <h3><i className="fas fa-info-circle"></i> Why Report?</h3>
            <div className={styles.infoContent}>
              <ul>
                <li>
                  <i className="fas fa-shield-alt"></i>
                  <span>Protect others from falling victim to scams</span>
                </li>
                <li>
                  <i className="fas fa-database"></i>
                  <span>Help improve our phishing detection system</span>
                </li>
                <li>
                  <i className="fas fa-user-shield"></i>
                  <span>Contribute to a safer internet community</span>
                </li>
                <li>
                  <i className="fas fa-bell"></i>
                  <span>Get notified when action is taken</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;