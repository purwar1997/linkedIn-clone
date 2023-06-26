import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { createPostAPI, editPostAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostModal({ closeModal, currentUser, post }) {
  const [postContent, setPostContent] = useState(post?.content || '');

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
        content: postContent.trim(),
        userId: currentUser.id,
        createdAt: new Date(),
      });

      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editPost = async () => {
    try {
      await editPostAPI(post.id, {
        content: postContent.trim(),
        updatedAt: new Date(),
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
          <h1>{post ? 'Edit your post' : 'Create a post'}</h1>
        </div>

        <textarea
          className='modal-input'
          name='post'
          placeholder='What do you want to talk about ?'
          value={postContent}
          onChange={event => setPostContent(event.target.value)}
        />

        {post ? (
          <button
            className={`save-changes-btn ${
              post.content === postContent || postContent.trim() === '' ? '' : 'active'
            }`}
            disabled={post.content === postContent || postContent.trim() === ''}
            onClick={editPost}
          >
            Save
          </button>
        ) : (
          <button
            className={`post-btn ${postContent.trim() === '' ? '' : 'active'}`}
            disabled={postContent.trim() === ''}
            onClick={createPost}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
