import React from 'react';

function NoteActionButton({ variant, onClick }) {
  switch (variant) {
  case 'delete':
    return (
      <button
        className="note-item__delete-button"
        type="button"
        onClick={onClick}
        data-testid="note-item-delete-button"
      >
                Delete
      </button>
    );
  case 'archive':
    return (
      <button
        className="note-item__archive-button"
        type="button"
        onClick={onClick}
        data-testid="note-item-archive-button"
      >
                Archive
      </button>
    );
  }
}

export default NoteActionButton;