import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { updateProfileAPI } from '../../api/FirestoreApi';
import './index.css';

export default function ProfileEdit({ onEdit, profile }) {
  const [userProfile, setUserProfile] = useState(profile);

  if (userProfile.skills && Array.isArray(userProfile.skills)) {
    setUserProfile({ ...userProfile, skills: userProfile.skills.join(', ') });
  }

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
          <p className='info'>Fields marked with * are mandatory</p>

          <div className='edit-input'>
            <label htmlFor='name'>Name *</label>
            <input
              type='text'
              name='name'
              id='name'
              value={userProfile.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='headline'>Headline *</label>
            <input
              type='text'
              name='headline'
              id='headline'
              value={userProfile.headline || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='location'>Location *</label>
            <input
              type='text'
              name='location'
              id='location'
              value={userProfile.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='education'>Education *</label>
            <input
              type='text'
              name='education'
              id='education'
              value={userProfile.education || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='industry'>Industry</label>
            <input
              type='text'
              name='industry'
              id='industry'
              value={userProfile.industry || ''}
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

          <div className='edit-input'>
            <label htmlFor='phoneNo'>Phone number *</label>
            <input
              type='tel'
              name='phoneNo'
              id='phoneNo'
              value={userProfile.phoneNo || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={userProfile.address || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='website'>Website</label>
            <input
              type='url'
              name='website'
              id='website'
              value={userProfile.website || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='skills'>Skills</label>
            <input
              type='text'
              name='skills'
              id='skills'
              value={userProfile.skills || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='about'>About</label>
            <textarea
              name='about'
              id='about'
              value={userProfile.about || ''}
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
