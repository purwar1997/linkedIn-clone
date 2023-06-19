import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import './index.css';

export default function CommentCard({ comment }) {
  const formatHeadline = headline =>
    headline.length > 120 ? `${headline.slice(0, 120)}...` : headline;

  return (
    <div className='comment-card'>
      <div className='comment-header'>
        <Link to={`/profile/${comment.addedBy.userId}`}>{comment.addedBy.username}</Link>

        {comment.addedBy.isAuthor && (
          <>
            <span className='comment-author'>Author</span>
            <BsThreeDots className='three-dots' />
          </>
        )}
      </div>

      <p className='comment-headline'>{formatHeadline(comment.addedBy.headline)}</p>
      <p className='comment-text'>{comment.text}</p>
    </div>
  );
}
