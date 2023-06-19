import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import { getPostCommentsAPI, addPostCommentAPI } from '../../api/FirestoreApi';
import CommentCard from '../CommentCard';
import './index.css';

export default function CommentBox({ post, currentUser }) {
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const getPostComments = async () => {
      try {
        await getPostCommentsAPI(post.id, setPostComments);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getPostComments();
  }, []);

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
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='comment-box'>
      <div className='add-comment-form'>
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
        {postComments.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
