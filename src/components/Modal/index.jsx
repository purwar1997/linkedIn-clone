import { RxCross1 } from 'react-icons/rx';
import './index.css';

export default function Modal({ closeModal }) {
  return (
    <div className='modal'>
      <button className='cross-btn' onClick={closeModal}>
        <RxCross1 />
      </button>

      <p>Some content...</p>
      <p>Some content...</p>
      <p>Some content...</p>

      <div className='btn-group'>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
}
