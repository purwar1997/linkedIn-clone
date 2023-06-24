import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { deleteImageAPI } from '../../api/StorageApi';
import ImageUploadModal from '../ImageUploadModal';
import './index.css';

export default function ProfileImageModal({
  currentUser,
  setProfileImageModal,
  imageUploadModal,
  setImageUploadModal,
}) {
  const closeModal = () => setProfileImageModal(false);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  const deleteImage = async () => {
    try {
      await deleteImageAPI(currentUser.id, currentUser.profileImage);
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className='modal-background' onClick={handleClick}>
        <div className='profile-modal-container'>
          <RxCross1 className='cross-btn' onClick={closeModal} />

          <img className='profile-modal-image' src={currentUser.imageUrl} />

          <div className='profile-modal-btns'>
            <button
              onClick={() => {
                setProfileImageModal(false);
                setImageUploadModal(true);
              }}
            >
              Change Image
            </button>

            <button onClick={deleteImage}>Delete</button>
          </div>
        </div>
      </div>

      {imageUploadModal && (
        <ImageUploadModal currentUser={currentUser} setImageUploadModal={setImageUploadModal} />
      )}
    </>
  );
}
