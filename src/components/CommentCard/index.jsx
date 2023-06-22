import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import CommentEdit from '../CommentEdit';
import './index.css';

export default function CommentCard({ comment }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formatHeadline = headline =>
    headline.length > 120 ? `${headline.slice(0, 120)}...` : headline;

  return (
    <div className='comment-card'>
      <div className='comment-header'>
        <Link to={`/profile/${comment.addedBy.userId}`}>{comment.addedBy.username}</Link>

        {comment.addedBy.isAuthor && (
          <>
            <span className='comment-author'>Author</span>

            {!isEdit && (
              <BsThreeDots className='three-dots' onClick={() => setIsPopupOpen(!isPopupOpen)} />
            )}
          </>
        )}
      </div>

      <p className='comment-headline'>{formatHeadline(comment.addedBy.headline)}</p>

      {isEdit ? (
        <CommentEdit comment={comment} setIsEdit={setIsEdit} />
      ) : (
        <p className='comment-text'>{comment.text}</p>
      )}

      {isPopupOpen && (
        <div className='comment-popup'>
          <div
            onClick={() => {
              setIsPopupOpen(false);
              setIsEdit(true);
            }}
          >
            <FaPen />
            <span>Edit</span>
          </div>

          <div>
            <FaTrashAlt />
            <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}
