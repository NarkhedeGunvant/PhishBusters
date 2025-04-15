import EmailScanner from '../components/scan/EmailScanner';

const ScanEmail = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Email Scanner</h2>
          <p>Analyze email content for phishing attempts. Our advanced AI detects suspicious patterns and potential threats.</p>
        </div>
        <EmailScanner />
      </div>
    </section>
  );
};

export default ScanEmail;