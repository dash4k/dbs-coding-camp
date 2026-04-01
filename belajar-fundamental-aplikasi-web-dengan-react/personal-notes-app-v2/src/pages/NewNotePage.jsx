import React from "react";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function NewNotePage() {
    const locale = React.useContext(LocaleContext);
    
    const [title, setTitle] = useInput('');
    const [body, setBody] = React.useState('');
    
    const navigate = useNavigate();

    const onBodyChange = (e) => {
        const body = e.currentTarget.innerHTML;
        setBody(body);
    }

    const onAddNewNote = async () => {
        addNote({ title, body }).then(({ error, data }) => {
            if (!error) navigate('/');
        });
    }

    return (
        <section className="add-new-page">
            <div className="add-new-page__input">
                <input 
                    type="text"
                    value={title}
                    onChange={setTitle}
                    placeholder={locale === 'id' ? 'Catatan Rahasia' : "Secret Note"}
                    className="add-new-page__input__title"
                />
                <div 
                    className="add-new-page__input__body"  
                    data-placeholder={locale === 'id' ? 'Sebenarnya saya adalah ...' : "The truth is, I am ..."}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={onBodyChange}
                >
                </div>
            </div>
            <div className="add-new-page__action">
                <button className="action" type="button" title="Save New Note Button" onClick={onAddNewNote}><HiCheck /></button>
            </div>
        </section>
    );
}

export default NewNotePage;
