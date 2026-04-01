import React from "react";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NotesList({ notes }) {
    const locale = React.useContext(LocaleContext);
    
    if (!notes || notes.length === 0) {
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty">{locale === 'id' ? 'Tidak ada catatan' : 'No notes'}</p>
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
