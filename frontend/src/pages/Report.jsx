const Report = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle report submission logic
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Report Phishing</h2>
          <p>Help protect others by reporting suspected phishing websites and emails.</p>
        </div>
        <div className="card" id="report-form-card">
          <form id="report-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phishing-url">Phishing URL</label>
              <input 
                type="url" 
                id="phishing-url" 
                placeholder="Enter the suspicious URL"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" required>
                <option value="">Select a category</option>
                <option value="Financial">Financial</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Social">Social Media</option>
                <option value="Email">Email Provider</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                placeholder="Provide any additional details about the phishing attempt"
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block" id="report-button">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Report;