import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCommentsAPI, addCommentAPI, getUsersAPI } from '../../api/FirestoreApi';
import CommentCard from '../CommentCard';
import placeholderAvatar from '../../assets/placeholder.png';
import './index.css';

export default function CommentBox({ post, currentUser }) {
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        await getCommentsAPI(post.id, setPostComments);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getComments();

    const getUsers = async () => {
      try {
        await getUsersAPI(setUsers);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getUsers();
  }, []);

  const addComment = async () => {
    try {
      const commentInfo = {
        text: comment.trim(),
        postId: post.id,
        userId: currentUser.id,
        addedByAuthor: currentUser.id === post.userId,
        createdAt: new Date(),
      };

      await addCommentAPI(commentInfo);
      setComment('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='comment-box'>
      <div className='add-comment-form'>
        <img src={currentUser.imageUrl || placeholderAvatar} alt={currentUser.name} />

        <input
          type='text'
          name='comment'
          placeholder='Add a comment...'
          value={comment}
          onChange={event => setComment(event.target.value)}
        />

        {comment && (
          <button
            className={`add-comment-btn ${comment.trim() !== '' ? 'active' : ''}`}
            disabled={comment.trim() === ''}
            onClick={addComment}
          >
            Post
          </button>
        )}
      </div>

      {postComments.length > 0 && (
        <div className='comments'>
          {postComments.map(comment => (
            <CommentCard
              key={comment.id}
              comment={comment}
              commentedBy={users.find(user => user.id === comment.userId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
