import styles from './BlogCard.module.css';

const BlogCard = ({ image, category, title, excerpt, author, date }) => {
  return (
    <article className={styles.blogCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <h3>
          <a href="#" className={styles.title}>{title}</a>
        </h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <div className={styles.author}>
            <img src={author.image} alt={author.name} className={styles.authorImage} />
            <span className={styles.authorName}>{author.name}</span>
          </div>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;