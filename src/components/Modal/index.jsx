import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import './index.css';

export default function Modal({ closeModal }) {
  const [post, setPost] = useState('');

  function closePostModal(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  async function createPost() {}

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
          className={`post-btn ${post.length > 0 ? 'active' : ''}`}
          onClick={createPost}
          disabled={post.trim() === ''}
        >
          Post
        </button>
      </div>
    </div>
  );
}
