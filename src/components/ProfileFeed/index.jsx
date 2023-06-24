import { useState, useEffect } from 'react';
import { BsPencilSquare, BsCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { getProfileAPI, getPostsAPI } from '../../api/FirestoreApi';
import ProfileEdit from '../ProfileEdit';
import PostCard from '../PostCard';
import ProfileImageModal from '../ProfileImageModal';
import ImageUploadModal from '../ImageUploadModal';
import './index.css';

export default function ProfileFeed({ currentUser, profileId }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [profileImageModal, setProfileImageModal] = useState(false);

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

        <div
          className='image-upload'
          onClick={() =>
            currentUser.imageUrl ? setProfileImageModal(true) : setImageUploadModal(true)
          }
        >
          {currentUser.imageUrl ? (
            <img className='profile-image' src={currentUser.imageUrl} />
          ) : (
            <BsCameraFill className='camera-icon' />
          )}
        </div>

        {profileImageModal && (
          <ProfileImageModal
            currentUser={currentUser}
            setProfileImageModal={setProfileImageModal}
            imageUploadModal={imageUploadModal}
            setImageUploadModal={setImageUploadModal}
          />
        )}

        {imageUploadModal && (
          <ImageUploadModal currentUser={currentUser} setImageUploadModal={setImageUploadModal} />
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
          .filter(post => post.userId === profileId)
          .map(post => (
            <PostCard key={post.id} post={post} currentUser={currentUser} postedBy={profile} />
          ))}
      </div>
    </div>
  );
}
