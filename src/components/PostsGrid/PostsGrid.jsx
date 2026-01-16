import { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import './PostsGrid.css';

export default function PostsGrid({ searchQuery = '' }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://cloud.codesupply.co/endpoint/react/data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="posts-grid">
        <div className="loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="posts-grid">
        <div className="error">Error: {error}</div>
      </section>
    );
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(query);
    const textMatch = post.text?.toLowerCase().includes(query);
    
    return titleMatch || textMatch;
  });

  return (
    <section className="posts-grid">
        {filteredPosts.length === 0 ? (
          <div className="no-results">
            {searchQuery ? `No posts found for "${searchQuery}"` : 'No posts available'}
          </div>
        ) : (
          filteredPosts.map((post, index) => {
            const mappedPost = {
              id: post.id || index,
              image: post.img,
              image2x: post.img_2x,
              category: post.tags,
              title: post.title,
              author: post.autor,
              date: post.date,
              views: `${post.views} Views`,
              description: post.text
            };
            
            return <PostCard key={mappedPost.id} {...mappedPost} />;
          })
        )}
    </section>
  );
}

