import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPostsAPI } from '../../api/FirestoreApi';
import Modal from '../Modal/index';
import PostCard from '../PostCard/index';
import topbarLogo from '../../assets/topbarLogo.png';
import './index.css';

export default function UserFeed({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        await getPostsAPI(setPosts);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getPosts();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='user-feed'>
      <div className='create-post-card'>
        <img className='user-image' src={topbarLogo} />
        <button className='open-modal-btn' onClick={openModal}>
          Start a post
        </button>
      </div>

      {isModalOpen && <Modal closeModal={closeModal} currentUser={currentUser} />}

      <div className='posts'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
