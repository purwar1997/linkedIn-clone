import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { createPostAPI } from '../../api/FirestoreApi';
import './index.css';

export default function Modal({ closeModal, currentUser }) {
  const [post, setPost] = useState('');

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  const closePostModal = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const createPost = async () => {
    try {
      await createPostAPI({
        content: post.trim(),
        userId: currentUser.id,
        createdAt: new Date(),
      });

      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='modal-background' onClick={closePostModal}>
      <div className='modal-container'>
        <button className='cross-btn' onClick={closeModal}>
          <RxCross1 />
        </button>

        <div className='modal-title'>
          <h1>Create a post</h1>
        </div>

        <textarea
          className='modal-input'
          name='post'
          placeholder='What do you want to talk about ?'
          value={post}
          onChange={event => setPost(event.target.value)}
        />

        <button
          className={`post-btn ${post.trim() !== '' ? 'active' : ''}`}
          onClick={createPost}
          disabled={post.trim() === ''}
        >
          Post
        </button>
      </div>
    </div>
  );
}
