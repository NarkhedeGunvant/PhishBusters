import { useState } from 'react';
import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

const BLOG_POSTS = [
  {
    id: 1,
    image: 'https://via.placeholder.com/600x400',
    category: 'Security Tips',
    title: 'How to Spot Common Phishing Tactics in 2025',
    excerpt: 'Learn about the latest phishing techniques and how to protect yourself from increasingly sophisticated attacks.',
    author: {
      name: 'Sarah Chen',
      image: 'https://via.placeholder.com/100x100'
    },
    date: 'March 15, 2025'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/600x400',
    category: 'Technology',
    title: 'AI-Powered Security: The Future of Phishing Prevention',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we detect and prevent phishing attacks.',
    author: {
      name: 'Michael Ross',
      image: 'https://via.placeholder.com/100x100'
    },
    date: 'March 12, 2025'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/600x400',
    category: 'Case Study',
    title: 'Recent Phishing Campaign Analysis: Banking Sector',
    excerpt: 'An in-depth look at a sophisticated phishing campaign targeting major banks and financial institutions.',
    author: {
      name: 'Emma Watson',
      image: 'https://via.placeholder.com/100x100'
    },
    date: 'March 10, 2025'
  }
];

const CATEGORIES = ['All', 'Security Tips', 'Technology', 'Case Study', 'News'];

const BlogGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className={styles.blogSection}>
      <div className="container">
        <div className="section-header">
          <div className="badge">Blog</div>
          <h2>Latest Security Insights</h2>
          <p>Stay informed about the latest phishing threats and security best practices</p>
        </div>
        
        <div className={styles.gridHeader}>
          <div className={styles.gridControls}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`${styles.categoryFilter} ${category === activeCategory ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.blogGrid}>
          {filteredPosts.map(post => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;