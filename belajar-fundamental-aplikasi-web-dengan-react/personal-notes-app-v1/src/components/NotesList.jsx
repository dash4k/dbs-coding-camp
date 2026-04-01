import React from "react";
import NoteItem from "./NoteItem";

function NotesList({ notes }) {
    if (!notes || notes.length === 0) {
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty">Tidak ada catatan</p>
            </section>
        );
    }
    return (
        <section className="notes-list">
            {notes.map((note) => <NoteItem key={note.id} {...note} />)}
        </section>
    );
}

export default NotesList;
