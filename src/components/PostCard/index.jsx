import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { managePostLikesAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostCard({ post, currentUser }) {
  const [postLiked, setPostLiked] = useState(post.likedBy && post.likedBy.includes(currentUser.id));

  const managePostLikes = async () => {
    try {
      await managePostLikesAPI(post.id, currentUser.id, postLiked ? 'unlike' : 'like');
      setPostLiked(!postLiked);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='post-card'>
      <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.name}</Link>

      <p>{post.content}</p>

      <div className={`like-button ${postLiked ? 'liked' : ''}`} onClick={managePostLikes}>
        {postLiked ? <AiFillLike className='like-icon' /> : <AiOutlineLike className='like-icon' />}
        <span>Like</span>
      </div>
    </div>
  );
}
