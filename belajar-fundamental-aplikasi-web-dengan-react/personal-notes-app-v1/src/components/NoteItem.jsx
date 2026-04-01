import React from "react";
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";

function NoteItem({ id, title, body, createdAt }) {
    return (
        <article className="note-item">
            <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

export default NoteItem;
