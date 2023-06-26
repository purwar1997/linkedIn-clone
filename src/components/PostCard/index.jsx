import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { manageLikesAPI } from '../../api/FirestoreApi';
import { getTimestamp } from '../../utils/getTimestamp';
import CommentBox from '../CommentBox';
import PostPopup from '../PostPopup';
import PostModal from '../PostModal';
import placeholderAvatar from '../../assets/placeholder.png';
import './index.css';

export default function PostCard({ post, currentUser, postedBy }) {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postLiked = post.likedBy && post.likedBy.includes(currentUser.id);

  const manageLikes = async () => {
    try {
      await manageLikesAPI(post.id, currentUser.id, postLiked ? 'unlike' : 'like');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='post-card'>
      <div className='post-card-header'>
        <img src={postedBy.imageUrl || placeholderAvatar} alt={postedBy.name} />

        <div className='profile-details'>
          <Link className='profile-link' to={`/profile/${postedBy.id}`}>
            {postedBy.name}
          </Link>

          <p className='profile-headline'>{postedBy.headline}</p>

          <span className='post-timestamp'>{getTimestamp(post.createdAt)}</span>
        </div>

        <span className='post-popup-icon' onClick={() => setIsPopupOpen(!isPopupOpen)}>
          <BsThreeDots className='three-dots' />
        </span>

        {isPopupOpen && (
          <PostPopup
            closePopup={() => setIsPopupOpen(false)}
            openModal={() => setIsModalOpen(true)}
            currentUser={currentUser}
            postId={post.id}
          />
        )}

        {isModalOpen && <PostModal closeModal={() => setIsModalOpen(false)} post={post} />}
      </div>

      <p className='post-content'>{post.content}</p>

      <p>
        {post.likedBy?.length ?? 0} {post.likedBy?.length === 1 ? 'Like' : 'Likes'}
      </p>

      <div className='divider' />

      <div className='like-and-comment'>
        <div className={`like-btn ${postLiked ? 'liked' : ''}`} onClick={manageLikes}>
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
