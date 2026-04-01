import React from "react";
import { addNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";

function NewNotePageWrapper() {
    const navigate = useNavigate();

    return <NewNotePage navigate={navigate} />
}

class NewNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onAddNewNote = this.onAddNewNote.bind(this);
    }

    onTitleChange(e) {
        this.setState(() => {
            return {
                title: e.target.value
            };
        })
    }

    onBodyChange(e) {
        const body = e.currentTarget.innerHTML;
        this.setState(() => {
            return {
                body
            };
        })
    }

    onAddNewNote() {
        addNote(this.state);
        this.props.navigate('/');
    }

    render() {
        return (
            <section className="add-new-page">
                <div className="add-new-page__input">
                    <input 
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        placeholder="Catatan rahasia"
                        className="add-new-page__input__title"
                    />
                    <div 
                        className="add-new-page__input__body"  
                        data-placeholder="Sebenarnya saya adalah ...."
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={this.onBodyChange}
                    >
                    </div>
                </div>
                <div className="add-new-page__action">
                    <button className="action" type="button" title="Save New Note Button" onClick={this.onAddNewNote}><HiCheck /></button>
                </div>
            </section>
        )
    }
}

export default NewNotePageWrapper;
