import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { uploadImageAPI } from '../../api/StorageApi';
import './index.css';

export default function ImageUploadModal({ currentUser, setImageUploadModal }) {
  const [profileImage, setProfileImage] = useState(null);

  const closeModal = () => setImageUploadModal(false);

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

  const uploadImage = async () => {
    try {
      //   console.log(profileImage);
      await uploadImageAPI(currentUser.id, profileImage);
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='modal-background' onClick={handleClick}>
      <div className='image-upload-modal-container'>
        <RxCross1 className='cross-btn' onClick={closeModal} />

        <h1 className='modal-heading'>Add Profile Image</h1>

        <div className='upload-image-input'>
          <label htmlFor='profile-image'>Add an image</label>

          <input
            type='file'
            id='profile-image'
            onChange={event => setProfileImage(event.target.files[0])}
            hidden
          />
        </div>

        <button
          className={`upload-photo-btn ${profileImage ? 'active-btn' : ''}`}
          onClick={uploadImage}
          disabled={profileImage === null}
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
}
