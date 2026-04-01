import React from "react";
import { showFormattedDateId, showFormattedDateEn } from "../utils";
import { HiArchiveBox, HiArchiveBoxArrowDown, HiArchiveBoxXMark } from "react-icons/hi2";
import LocaleContext from "../contexts/LocaleContext";

function NoteDetail({ onArchive, onDelete, onUnarchive, id, title, createdAt, body, archived }) {
    const locale = React.useContext(LocaleContext);

    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{locale === 'id' ? showFormattedDateId(createdAt) : showFormattedDateEn(createdAt)}</p>
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
