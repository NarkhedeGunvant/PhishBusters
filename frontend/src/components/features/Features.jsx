import FeatureCard from './FeatureCard';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      icon: 'fa-link',
      title: 'URL Analysis',
      description: 'Our AI engine scans URLs in real-time to detect phishing attempts with high accuracy'
    },
    {
      icon: 'fa-envelope',
      title: 'Email Scanning',
      description: 'Analyze suspicious emails to identify phishing content, malicious links, and social engineering tactics'
    },
    {
      icon: 'fa-database',
      title: 'Threat Database',
      description: 'Access our constantly updated database of known phishing sites and attack patterns'
    },
    {
      icon: 'fa-file-alt',
      title: 'Educational Resources',
      description: 'Stay informed with our blog posts about the latest phishing techniques and prevention methods'
    }
  ];

  return (
    <div className={styles.features}>
      <div className="container">
        <div className="section-header">
          <div className="badge">Features</div>
          <h2>Comprehensive Protection</h2>
          <p>Our suite of security tools keeps you safe from all types of phishing threats</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;