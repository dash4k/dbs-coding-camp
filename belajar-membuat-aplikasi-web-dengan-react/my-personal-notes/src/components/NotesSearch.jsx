import React from 'react';

function NotesSearch({ val, onInputChange }) {
  return (
    <div className="notes-search">
      <input value={val} type="text" placeholder="Cari berdasarkan judul ..." onChange={onInputChange} />
    </div>
  );
}

export default NotesSearch;