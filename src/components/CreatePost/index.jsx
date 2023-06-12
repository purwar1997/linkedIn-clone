import { useState } from 'react';
import Modal from '../Modal/index';
import topbarLogo from '../../assets/topbarLogo.png';
import './index.css';

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className='create-post'>
        <img className='user-image' src={topbarLogo} />
        <button className='open-modal-btn' onClick={openModal}>
          Start a post
        </button>
      </div>

      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
}
