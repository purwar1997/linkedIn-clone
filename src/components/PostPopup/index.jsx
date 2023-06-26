import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { deletePostAPI, saveOrUnsavePostAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostPopup({ closePopup, openModal, currentUser, postId }) {
  const postSaved = currentUser.savedPosts?.includes(postId);

  const saveOrUnsavePost = async () => {
    try {
      await saveOrUnsavePostAPI(currentUser.id, postId, postSaved ? 'unsave' : 'save');
      closePopup();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deletePost = async () => {
    try {
      await deletePostAPI(postId);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='popup post-type'>
      <div className='popup-item' onClick={saveOrUnsavePost}>
        {postSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
        <span>{postSaved ? 'Unsave' : 'Save'} post</span>
      </div>

      <div
        className='popup-item'
        onClick={() => {
          closePopup();
          openModal();
        }}
      >
        <FaPen />
        <span>Edit post</span>
      </div>

      <div className='popup-item' onClick={deletePost}>
        <FaTrashAlt />
        <span>Delete post</span>
      </div>
    </div>
  );
}
