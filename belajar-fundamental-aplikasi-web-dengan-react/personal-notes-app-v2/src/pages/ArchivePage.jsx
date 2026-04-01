import React from "react";
import NotesList from "../components/NotesList";
import { getArchivedNotes } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function ArchivePage() {
    const locale = React.useContext(LocaleContext);
    
    const [notes, setNotes] = React.useState([]);
    const [initializing, setInitializing] = React.useState(true);

    React.useEffect(() => {
        getArchivedNotes().then(({ error, data }) => {
            if (!error) setNotes(data);
        }).finally(() => {
            setInitializing(false);
        });
    }, []);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = useInput(searchParams.get('keyword') || '');

    function changeKeyword(e) {
        setKeyword(e);
        setSearchParams({ keyword: e.target.value });
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(
            keyword.toLowerCase()
        );
    });

    return (
        <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            <SearchBar value={keyword} setValue={changeKeyword} />
            {initializing ? (locale === 'id' ? 'Memuat catatan ...' : 'Fetching notes ...') : <NotesList notes={filteredNotes} />}
        </section>
    );
}

export default ArchivePage;
