import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Latest Phishing Trends and Prevention Strategies',
    excerpt: 'An analysis of emerging phishing tactics and effective countermeasures for 2025',
    author: { name: 'BleepingComputer' },
    date: 'April 15, 2025',
    url: 'https://www.bleepingcomputer.com/security/phishing/'
  },
  {
    id: 2,
    title: 'Business Email Compromise: A Growing Threat',
    excerpt: 'How cybercriminals are targeting businesses through sophisticated email scams',
    author: { name: 'Kaspersky Blog' },
    date: 'April 14, 2025',
    url: 'https://www.kaspersky.com/blog/business-email-compromise/'
  },
  {
    id: 3,
    title: 'CISA Alert: New Wave of Spear Phishing Attacks',
    excerpt: 'Government agencies warn about targeted phishing campaigns against critical infrastructure',
    author: { name: 'CISA' },
    date: 'April 13, 2025',
    url: 'https://www.cisa.gov/news-events/cybersecurity-advisories'
  },
  {
    id: 4,
    title: 'QR Code Phishing: A New Vector for Attack',
    excerpt: 'Understanding and protecting against QR code-based phishing attacks',
    author: { name: 'Trend Micro' },
    date: 'April 12, 2025',
    url: 'https://www.trendmicro.com/vinfo/us/security/news/'
  },
  {
    id: 5,
    title: 'Social Media Scams on the Rise',
    excerpt: 'How scammers are exploiting social media platforms to target victims',
    author: { name: 'Norton' },
    date: 'April 11, 2025',
    url: 'https://us.norton.com/blog/'
  },
  {
    id: 6,
    title: 'AI-Generated Phishing Attacks',
    excerpt: 'The emergence of AI-powered phishing and how to detect it',
    author: { name: 'Proofpoint' },
    date: 'April 10, 2025',
    url: 'https://www.proofpoint.com/us/blog/'
  },
  {
    id: 7,
    title: 'Microsoft Security Report: Phishing Trends',
    excerpt: 'Analysis of global phishing patterns and attack techniques',
    author: { name: 'Microsoft Security' },
    date: 'April 9, 2025',
    url: 'https://www.microsoft.com/en-us/security/blog/'
  },
  {
    id: 8,
    title: 'Advanced Persistent Threats and Phishing',
    excerpt: 'How APT groups are using sophisticated phishing techniques',
    author: { name: 'FireEye' },
    date: 'April 8, 2025',
    url: 'https://www.mandiant.com/resources/blog'
  },
  {
    id: 9,
    title: 'Email Security Best Practices 2025',
    excerpt: 'Updated guidelines for protecting against email-based threats',
    author: { name: 'Cisco Security' },
    date: 'April 7, 2025',
    url: 'https://blogs.cisco.com/security'
  },
  {
    id: 10,
    title: 'Mobile Phishing: Beyond Email',
    excerpt: 'Understanding and preventing mobile-based phishing attacks',
    author: { name: 'Symantec' },
    date: 'April 6, 2025',
    url: 'https://symantec-enterprise-blogs.security.com/'
  },
  {
    id: 11,
    title: 'Cryptocurrency Scams and Phishing',
    excerpt: 'The latest tactics used in crypto-related phishing attacks',
    author: { name: 'Dark Reading' },
    date: 'April 5, 2025',
    url: 'https://www.darkreading.com/security'
  },
  {
    id: 12,
    title: 'Security Awareness Training Essentials',
    excerpt: 'Key components of effective phishing awareness programs',
    author: { name: 'SANS ISC' },
    date: 'April 4, 2025',
    url: 'https://isc.sans.edu/'
  },
  {
    id: 13,
    title: 'Supply Chain Phishing Attacks',
    excerpt: 'How attackers are targeting supply chain vulnerabilities',
    author: { name: 'IBM Security' },
    date: 'April 3, 2025',
    url: 'https://securityintelligence.com/'
  },
  {
    id: 14,
    title: 'Voice Phishing: The Rise of Vishing',
    excerpt: 'Understanding and preventing voice-based phishing attacks',
    author: { name: 'Check Point' },
    date: 'April 2, 2025',
    url: 'https://blog.checkpoint.com/'
  },
  {
    id: 15,
    title: 'Deepfake-Enhanced Phishing Scams',
    excerpt: 'How criminals are using deepfake technology in phishing',
    author: { name: 'McAfee' },
    date: 'April 1, 2025',
    url: 'https://www.mcafee.com/blogs/'
  },
  {
    id: 16,
    title: '2025 Phishing Statistics Report',
    excerpt: 'Analysis of current phishing trends and statistics',
    author: { name: 'ZDNet Security' },
    date: 'March 31, 2025',
    url: 'https://www.zdnet.com/security/'
  },
  {
    id: 17,
    title: 'Ransomware Through Phishing',
    excerpt: 'The connection between phishing and ransomware attacks',
    author: { name: 'Sophos News' },
    date: 'March 30, 2025',
    url: 'https://news.sophos.com/'
  },
  {
    id: 18,
    title: 'Cloud-Based Phishing Attacks',
    excerpt: 'How attackers are exploiting cloud services for phishing',
    author: { name: 'Akamai Security' },
    date: 'March 29, 2025',
    url: 'https://www.akamai.com/blog/'
  },
  {
    id: 19,
    title: 'Zero-Day Exploits in Phishing',
    excerpt: 'Analysis of zero-day vulnerabilities in phishing campaigns',
    author: { name: 'Fortinet Blog' },
    date: 'March 28, 2025',
    url: 'https://www.fortinet.com/blog/'
  },
  {
    id: 20,
    title: 'Web-Based Phishing Prevention',
    excerpt: 'Best practices for preventing web-based phishing attacks',
    author: { name: 'Imperva' },
    date: 'March 27, 2025',
    url: 'https://www.imperva.com/blog/'
  }
];

const BlogGrid = () => {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className={styles.blogGrid}>
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;