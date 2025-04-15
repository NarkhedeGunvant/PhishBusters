import URLScanner from '../components/scan/URLScanner';

const ScanURL = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>URL Scanner</h2>
          <p>Check if a website is safe to visit. Our AI-powered scanner analyzes URLs for potential phishing threats.</p>
        </div>
        <URLScanner />
      </div>
    </section>
  );
};

export default ScanURL;