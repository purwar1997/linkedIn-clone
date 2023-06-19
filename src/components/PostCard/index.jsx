import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import { managePostLikesAPI, addPostCommentAPI, getPostCommentsAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostCard({ post, currentUser }) {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState('');

  const postLiked = post.likedBy && post.likedBy.includes(currentUser.id);

  const managePostLikes = async () => {
    try {
      await managePostLikesAPI(post.id, currentUser.id, postLiked ? 'unlike' : 'like');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const manageCommentBox = async () => {
    if (isCommentBoxOpen) {
      setIsCommentBoxOpen(false);
    } else {
      setIsCommentBoxOpen(true);
      await getPostCommentsAPI(post.id, setPostComments);
    }
  };

  const addPostComment = async () => {
    try {
      const commentInfo = {
        text: comment.trim(),
        postId: post.id,
        addedBy: {
          userId: currentUser.id,
          username: currentUser.name,
          headline: currentUser.headline,
          isAuthor: currentUser.id === post.createdBy.id,
        },
        date: DateTime.now().toJSDate(),
      };

      await addPostCommentAPI(commentInfo);
      setComment('');
      // const comments = await getPostCommentsAPI(commentIds);
      // setPostComments(comments);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='post-card'>
      <Link to={`/profile/${post.createdBy.id}`}>{post.createdBy.name}</Link>

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

        <div className='comment-btn' onClick={manageCommentBox}>
          <BiCommentDetail className='comment-icon' />
          <span>Comment</span>
        </div>
      </div>

      {isCommentBoxOpen && (
        <>
          <div className='comment-box'>
            <input
              type='text'
              name='comment'
              placeholder='Add a comment...'
              value={comment}
              onChange={event => setComment(event.target.value)}
            />

            {comment && (
              <button
                className={`comment-post-btn ${comment.trim() !== '' ? 'active' : ''}`}
                disabled={comment.trim() === ''}
                onClick={addPostComment}
              >
                Post
              </button>
            )}
          </div>

          <div className='comments'>
            {postComments.map(postComment => (
              <div className='comment' key={comment.id}>
                <div className='comment-header'>
                  <Link to={`/profile/${postComment.user}`}>
                    <h4>{postComment.addedBy.username}</h4>
                  </Link>

                  {postComment.addedBy.isAuthor && <span className='comment-author'>Author</span>}

                  {/* add comment date */}
                </div>

                <p className='comment-headline'>{postComment.addedBy.headline}</p>

                <p className='comment-text'>{postComment.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
