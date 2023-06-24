import { useState } from 'react';
import { toast } from 'react-toastify';
import { editCommentAPI } from '../../api/FirestoreApi';
import './index.css';

export default function CommentEdit({ comment, setIsEdit }) {
  const [commentText, setCommentText] = useState(comment.text);

  const editComment = async () => {
    try {
      await editCommentAPI(comment.id, {
        text: commentText,
        updatedAt: new Date(),
      });

      setIsEdit(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='edit-comment-form'>
      <input
        type='text'
        name='comment'
        placeholder='Add a comment...'
        value={commentText}
        onChange={event => setCommentText(event.target.value)}
      />

      <div className='edit-comment-btns'>
        <button
          id={commentText === comment.text ? '' : 'save-changes-btn'}
          disabled={commentText === comment.text}
          onClick={editComment}
        >
          Save Changes
        </button>

        <button onClick={() => setIsEdit(false)}>Cancel</button>
      </div>
    </div>
  );
}
