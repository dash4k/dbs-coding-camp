import React from "react";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import LocaleContext from "../contexts/LocaleContext";

function DetailPage() {
    const locale = React.useContext(LocaleContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = React.useState(null);
    const [initializing, setInitializing] = React.useState(true);

    React.useEffect(() => {
        getNote(id).then(({ error, data }) => {
            if (!error) setNote(data);
        }).finally(() => {
            setInitializing(false);
        });
    }, [id]);

    async function onArchiveHandler(id) {
        await archiveNote(id);
        navigate('/');
    }

    async function onUnarchiveHandler(id) {
        await unarchiveNote(id);
        navigate('/');
    }

    async function onDeleteHandler(id) {
        await deleteNote(id);
        navigate('/');
    }

    if (initializing) {
        return <p>{locale === 'id' ? 'Memuat catatan ...' : 'Loading note ...'}</p>
    }
    
    return (
        <NoteDetail onDelete={onDeleteHandler} onArchive={onArchiveHandler} onUnarchive={onUnarchiveHandler} {...note} />
    )
}

export default DetailPage;
