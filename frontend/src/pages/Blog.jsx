import BlogGrid from '../components/blog/BlogGrid';

const Blog = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Security Blog</h2>
          <p>Stay informed about the latest phishing threats and cybersecurity best practices.</p>
        </div>
        <BlogGrid />
      </div>
    </section>
  );
};

export default Blog;