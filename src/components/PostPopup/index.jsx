import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deletePostAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostPopup({ closePopup, openModal, postId }) {
  const deletePost = async () => {
    try {
      await deletePostAPI(postId);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='popup post-type'>
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
