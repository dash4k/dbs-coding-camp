import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword }) {
  const hasNotes = notes.length > 0;
  const groupedNotes = notes.reduce((acc, note) => {
    const key = note.createdAt.slice(0, 7);
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);

    return acc;
  }, {});

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >Tidak ada catatan untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([monthYear, notes]) => (
        <section className='notes-group' key={monthYear}>
          <h3 className='notes-group__header'>{monthYear}</h3>
          {notes.map((note) => <NoteItem note={note} onArchive={onArchive} onDelete={onDelete} searchKeyword={searchKeyword} key={note.id} />)}
        </section>
      ))}
    </div>
  );
}

export default NotesList;
