import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { updateUserAPI } from '../../api/FirestoreApi';
import './index.css';

export default function PostEdit({ onEdit, currentUser }) {
  const [userDetails, setUserDetails] = useState({
    name: currentUser.name,
    headline: currentUser.headline,
    location: currentUser.location,
    education: currentUser.education,
    company: currentUser.company,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const updateUser = async event => {
    event.preventDefault();

    try {
      await updateUserAPI(currentUser.id, userDetails);
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
              value={userDetails.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='headline'>Headline</label>
            <input
              type='text'
              name='headline'
              id='headline'
              value={userDetails.headline || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              value={userDetails.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='education'>Education</label>
            <input
              type='text'
              name='education'
              id='education'
              value={userDetails.education || ''}
              onChange={handleChange}
            />
          </div>

          <div className='edit-input'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              value={userDetails.company || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='edit-modal-footer'>
          <button className='save-btn' onClick={updateUser}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
