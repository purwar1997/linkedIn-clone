import { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { getProfileAPI, getPostsAPI } from '../../api/FirestoreApi';
import PostEdit from '../PostEdit';
import PostCard from '../PostCard';
import './index.css';

export default function ProfileFeed({ currentUser, profileId }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => setIsEdit(!isEdit);

  useEffect(() => {
    const getProfile = async () => {
      try {
        await getProfileAPI(profileId, setProfile);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getProfile();

    const getUserPosts = async () => {
      try {
        await getPostsAPI(setPosts);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getUserPosts();
  }, []);

  if (!profile) {
    return;
  }

  return (
    <div className='profile-feed'>
      <div className='profile-card'>
        {currentUser.id === profileId && (
          <button className='edit-button' onClick={onEdit}>
            <BsPencilSquare />
          </button>
        )}

        <div className='profile-info'>
          <div className='profile-info-left'>
            <h2 className='username'>{profile.name}</h2>
            <p className='headline'>{profile.headline}</p>
            <p>{profile.location}</p>
          </div>

          <div className='profile-info-right'>
            <p>{profile.education}</p>
            {profile.company && <p>{profile.company}</p>}
          </div>
        </div>

        {isEdit && <PostEdit onEdit={onEdit} profile={profile} />}
      </div>

      <div className='posts'>
        {posts
          .filter(post => post.createdBy.id === profileId)
          .map(post => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
}
