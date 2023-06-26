import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUsersAPI, getPostsAPI } from '../../api/FirestoreApi';
import PostModal from '../PostModal';
import PostCard from '../PostCard';
import placeholderAvatar from '../../assets/placeholder.png';
import './index.css';

export default function UserFeed({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        await getPostsAPI(setPosts);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getPosts();

    const getUsers = async () => {
      try {
        await getUsersAPI(setUsers);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getUsers();
  }, []);

  return (
    <div className='userfeed'>
      <div className='create-post-card'>
        <img src={currentUser.imageUrl || placeholderAvatar} alt={currentUser.name} />

        <button className='open-modal-btn' onClick={() => setIsModalOpen(true)}>
          Start a post
        </button>
      </div>

      {isModalOpen && (
        <PostModal closeModal={() => setIsModalOpen(false)} currentUser={currentUser} />
      )}

      {posts.length > 0 && (
        <div className='posts'>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              postedBy={users.find(user => user.id === post.userId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
