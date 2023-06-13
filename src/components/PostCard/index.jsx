import './index.css';

export default function PostCard({ post }) {
  return (
    <div className='post-card'>
      <p>{post.content}</p>
    </div>
  );
}
