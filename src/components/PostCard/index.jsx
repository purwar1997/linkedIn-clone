import { Link } from 'react-router-dom';
import './index.css';

export default function PostCard({ post }) {
  return (
    <div className='post-card'>
      <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.name}</Link>
      <p>{post.content}</p>
    </div>
  );
}
