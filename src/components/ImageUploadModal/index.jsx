import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { Progress } from 'antd';
import { uploadImageAPI } from '../../api/StorageApi';
import './index.css';

export default function ImageUploadModal({ currentUser, setImageUploadModal }) {
  const [profileImage, setProfileImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);

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

  const selectImage = event => {
    const image = event.target.files[0];
    setProfileImage(image);

    const reader = new FileReader();
    reader.addEventListener('load', event => setImageURL(event.target.result));
    reader.readAsDataURL(image);
  };

  const uploadImage = async () => {
    try {
      await uploadImageAPI(currentUser.id, profileImage, setProgress);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (progress === 100) {
    closeModal();
  }

  return (
    <div className='modal-background' onClick={handleClick}>
      <div className='image-upload-modal-container'>
        <RxCross1 className='cross-btn' onClick={closeModal} />

        <h1 className='modal-heading'>Add Profile Image</h1>

        <div className='image-upload-input'>
          {progress > 0 ? (
            <Progress type='circle' percent={Math.round(progress)} />
          ) : imageURL ? (
            <img className='uploaded-image' src={imageURL} />
          ) : (
            <>
              <label htmlFor='profile-image'>Select an image</label>
              <input type='file' id='profile-image' onChange={selectImage} hidden />
            </>
          )}
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
