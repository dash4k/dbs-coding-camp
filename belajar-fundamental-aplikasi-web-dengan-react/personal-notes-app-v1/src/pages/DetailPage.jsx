import React from "react";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";

function DetailPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: getNote(props.id),
        };

        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onArchiveHandler(id) {
        archiveNote(id);
        this.props.navigate('/');
    }

    onUnarchiveHandler(id) {
        unarchiveNote(id);
        this.props.navigate('/');
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.props.navigate('/');
    }

    render() {
        const { note } = this.state;
        
        return (
            <NoteDetail onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} onUnarchive={this.onUnarchiveHandler} {...note} />
        );
    }
}

export default DetailPageWrapper;
