import React from "react";
import { showFormattedDate } from "../utils";
import { HiArchiveBox, HiArchiveBoxArrowDown, HiArchiveBoxXMark } from "react-icons/hi2";

function NoteDetail({ onArchive, onDelete, onUnarchive, id, title, createdAt, body, archived }) {
    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="detail-page__body">{body}</div>
            <div className="detail-page__action">
                {archived ? 
                    <button className="action" title="Unarchive Button" onClick={() => onUnarchive(id)}><HiArchiveBoxArrowDown /></button> 
                    : <button className="action" title="Archive Button" onClick={() => onArchive(id)}><HiArchiveBox /></button>
                }
                <button className="action" title="Delete Button" onClick={() => onDelete(id)}><HiArchiveBoxXMark /></button>
            </div>
        </section>
    );
}

export default NoteDetail;
