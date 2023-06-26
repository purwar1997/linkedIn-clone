import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteCommentAPI } from '../../api/FirestoreApi';
import { getTimestamp } from '../../utils/getTimestamp';
import CommentEdit from '../CommentEdit';
import placeholderAvatar from '../../assets/placeholder.png';
import './index.css';

export default function CommentCard({ comment, commentedBy, currentUser }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editComment, setEditComment] = useState(false);

  const formatHeadline = headline =>
    headline.length > 120 ? `${headline.slice(0, 120)}...` : headline;

  const deleteComment = async () => {
    try {
      await deleteCommentAPI(comment.id);
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

          {comment.addedByAuthor && <span className='comment-author'>Author</span>}

          {comment.userId === currentUser.id && !editComment && (
            <span className='comment-popup-icon' onClick={() => setIsPopupOpen(!isPopupOpen)}>
              <BsThreeDots />
            </span>
          )}

          {!editComment && (
            <span className='comment-timestamp'>
              {getTimestamp(comment?.updatedAt || comment.createdAt)}{' '}
              {comment.updatedAt && '(edited)'}
            </span>
          )}
        </div>

        <p className='comment-headline'>{formatHeadline(commentedBy.headline)}</p>

        {editComment ? (
          <CommentEdit comment={comment} setEditComment={setEditComment} />
        ) : (
          <p className='comment-text'>{comment.text}</p>
        )}

        {isPopupOpen && (
          <div className='popup'>
            <div
              className='popup-item'
              onClick={() => {
                setIsPopupOpen(false);
                setEditComment(true);
              }}
            >
              <FaPen />
              <span>Edit</span>
            </div>

            <div className='popup-item' onClick={deleteComment}>
              <FaTrashAlt />
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
