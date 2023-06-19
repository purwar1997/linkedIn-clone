import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { managePostLikesAPI } from '../../api/FirestoreApi';
import CommentBox from '../CommentBox';
import './index.css';

export default function PostCard({ post, currentUser }) {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const postLiked = post.likedBy && post.likedBy.includes(currentUser.id);

  const managePostLikes = async () => {
    try {
      await managePostLikesAPI(post.id, currentUser.id, postLiked ? 'unlike' : 'like');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='post-card'>
      <Link className='profile-link' to={`/profile/${post.createdBy.id}`}>
        {post.createdBy.name}
      </Link>

      <p>{post.content}</p>

      <p>
        {post.likedBy?.length ?? 0} {post.likedBy?.length === 1 ? 'Like' : 'Likes'}
      </p>

      <div className='divider' />

      <div className='post-actions'>
        <div className={`like-btn ${postLiked ? 'liked' : ''}`} onClick={managePostLikes}>
          {postLiked ? (
            <AiFillLike className='unlike-icon' />
          ) : (
            <AiOutlineLike className='like-icon' />
          )}
          <span>Like</span>
        </div>

        <div className='comment-btn' onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
          <BiCommentDetail className='comment-icon' />
          <span>Comment</span>
        </div>
      </div>

      {isCommentBoxOpen && <CommentBox post={post} currentUser={currentUser} />}
    </div>
  );
}
