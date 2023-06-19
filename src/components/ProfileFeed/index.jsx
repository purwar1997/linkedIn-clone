import { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { getProfileAPI, getPostsAPI } from '../../api/FirestoreApi';
import ProfileEdit from '../ProfileEdit';
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

    // const getComments = async () => {
    //   try {
    //     await getCommentsAPI(setComments);
    //   } catch (err) {
    //     toast.error(err.message);
    //   }
    // };

    // getComments();
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
          <div className='profile-info-top'>
            <div className='profile-info-left'>
              <h2 className='username'>{profile.name}</h2>
              <p className='headline'>{profile.headline}</p>
              <p>{profile.location}</p>
              {profile.website && (
                <a className='website' href={profile.website} target='_blank'>
                  {profile.website}
                </a>
              )}
            </div>

            <div className='profile-info-right'>
              <p>{profile.education}</p>
              {profile.company && <p>{profile.company}</p>}
            </div>
          </div>

          <div className='profile-info-bottom'>
            {profile.about && <p className='about'>{profile.about}</p>}
            {profile.skills && (
              <p className='skills'>
                <span>Skills: </span>
                {profile.skills.join(', ')}
              </p>
            )}
          </div>
        </div>

        {isEdit && <ProfileEdit onEdit={onEdit} profile={profile} />}
      </div>

      <div className='posts'>
        {posts
          .filter(post => post.createdBy.id === profileId)
          .map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              // comments={
              //   post.commentedBy &&
              //   comments.filter(comment => post.commentedBy.includes(comment.id))
              // }
            />
          ))}
      </div>
    </div>
  );
}
