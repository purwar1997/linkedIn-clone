import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import PostEdit from '../PostEdit';
import './index.css';

export default function ProfileCard({ currentUser }) {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => setIsEdit(!isEdit);

  return (
    <div className='profile-card'>
      <button className='edit-button' onClick={onEdit}>
        <BsPencilSquare />
      </button>

      <h2 className='username'>{currentUser.name}</h2>

      <p className='email'>{currentUser.email}</p>

      {isEdit && <PostEdit onEdit={onEdit} currentUser={currentUser} />}
    </div>
  );
}
