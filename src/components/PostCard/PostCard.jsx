import './PostCard.css';

export default function PostCard({ image, image2x, category, title, author, date, views, description }) {
  return (
    <article className="post-card">
      <div className="post-card-image">
        <img 
          src={image} 
          srcSet={image2x ? `${image} 1x, ${image2x} 2x` : undefined}
          alt={title} 
        />
      </div>
      <div className="post-card-content">
        <span className="post-card-category">{category}</span>
        <h2 className="post-card-title">{title}</h2>
        <p className="post-card-meta">
  <span className="post-author">{author}</span> • {date} • {views}
</p>
        <p className="post-card-description">{description}</p>
      </div>
    </article>
  );
}

