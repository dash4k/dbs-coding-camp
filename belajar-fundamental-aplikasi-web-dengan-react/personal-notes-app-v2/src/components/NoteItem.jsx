import React from "react";
import { showFormattedDateId, showFormattedDateEn } from "../utils";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function NoteItem({ id, title, body, createdAt }) {
    const locale = React.useContext(LocaleContext);
    
    return (
        <article className="note-item">
            <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
            <p className="note-item__createdAt">{locale === 'id' ? showFormattedDateId(createdAt) : showFormattedDateEn(createdAt)}</p>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

export default NoteItem;
