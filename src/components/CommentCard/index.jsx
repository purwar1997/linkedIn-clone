import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteCommentAPI } from '../../api/FirestoreApi';
import CommentEdit from '../CommentEdit';
import placeholderAvatar from '../../assets/placeholder.png';
import './index.css';

export default function CommentCard({ comment, commentedBy }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formatHeadline = headline =>
    headline.length > 120 ? `${headline.slice(0, 120)}...` : headline;

  const deleteComment = async () => {
    try {
      await deleteCommentAPI(comment.id);
      setIsPopupOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='comment'>
      <img src={commentedBy.imageUrl || placeholderAvatar} alt={commentedBy.name} />

      <div className='comment-card'>
        <div className='comment-card-header'>
          <Link to={`/profile/${commentedBy.id}`}>{commentedBy.name}</Link>

          {comment.addedByAuthor && (
            <>
              <span className='comment-author'>Author</span>

              {!isEdit && (
                <BsThreeDots className='three-dots' onClick={() => setIsPopupOpen(!isPopupOpen)} />
              )}
            </>
          )}
        </div>

        <p className='comment-headline'>{formatHeadline(commentedBy.headline)}</p>

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

            <div onClick={deleteComment}>
              <FaTrashAlt />
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
