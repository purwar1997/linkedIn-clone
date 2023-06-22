import { useState } from 'react';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import { editPostCommentAPI } from '../../api/FirestoreApi';
import './index.css';

export default function CommentEdit({ comment, setIsEdit }) {
  const [commentText, setCommentText] = useState(comment.text);

  const editPostComment = async () => {
    try {
      await editPostCommentAPI(comment.id, {
        text: commentText,
        updatedAt: DateTime.now().toJSDate(),
      });

      setIsEdit(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='comment-edit-form'>
      <input
        type='text'
        name='comment'
        placeholder='Add a comment...'
        value={commentText}
        onChange={event => setCommentText(event.target.value)}
      />

      <div className='edit-form-btns'>
        <button
          id={commentText === comment.text ? '' : 'save-changes'}
          disabled={commentText === comment.text}
          onClick={editPostComment}
        >
          Save Changes
        </button>
        <button onClick={() => setIsEdit(false)}>Cancel</button>
      </div>
    </div>
  );
}
