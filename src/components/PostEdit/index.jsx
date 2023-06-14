import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { updateProfileAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostEdit({ onEdit, profile }) {
  const [userProfile, setUserProfile] = useState({
    name: profile.name,
    headline: profile.headline,
    location: profile.location,
    education: profile.education,
    company: profile.company,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const updateProfile = async event => {
    event.preventDefault();

    try {
      await updateProfileAPI(profile.id, userProfile);
      onEdit();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeEditModal = event => {
    if (event.target === event.currentTarget) {
      onEdit();
    }
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onEdit();
    }
  });

  return (
    <div className='edit-modal-background' onClick={closeEditModal}>
      <div className='edit-modal-container'>
        <div className='edit-modal-header'>
          <h3>Edit intro</h3>

          <button onClick={onEdit}>
            <RxCross1 />
          </button>
        </div>

        <div className='edit-modal-body'>
          <div className='edit-input'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={userProfile.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='headline'>Headline</label>
            <input
              type='text'
              name='headline'
              id='headline'
              value={userProfile.headline || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              value={userProfile.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='education'>Education</label>
            <input
              type='text'
              name='education'
              id='education'
              value={userProfile.education || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              value={userProfile.company || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='edit-modal-footer'>
          <button className='save-btn' onClick={updateProfile}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
