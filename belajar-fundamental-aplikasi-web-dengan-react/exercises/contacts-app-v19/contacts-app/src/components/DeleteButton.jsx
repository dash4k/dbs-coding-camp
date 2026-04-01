import React from 'react';
import { FiDelete } from 'react-icons/fi';

function DeleteButton(props) {
  const { id, onDelete } = props;
  
  return <button className='contact-item__delete' onClick={() => onDelete(id)}><FiDelete /></button>
}

export default DeleteButton;