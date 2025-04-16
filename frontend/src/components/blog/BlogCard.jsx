import styles from './BlogCard.module.css';

const BlogCard = ({ title, excerpt, author, date, url }) => {
  return (
    <article className={styles.blogCard}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.footer}>
            <span className={styles.source}>{author.name}</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default BlogCard;