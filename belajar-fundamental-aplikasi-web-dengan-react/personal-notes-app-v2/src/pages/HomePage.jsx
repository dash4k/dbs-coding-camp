import React from "react";
import { getActiveNotes } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import { HiMiniPlus } from "react-icons/hi2";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
    const locale = React.useContext(LocaleContext);
    
    const [notes, setNotes] = React.useState([]);
    const [initializing, setInitializing] = React.useState(true);

    React.useEffect(() => {
        getActiveNotes().then(({ error, data }) => {
            if (!error) setNotes(data);
        }).finally(() => {
            setInitializing(false);
        });
    }, []);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = useInput(searchParams.get('keyword') || '');
    
    const navigate = useNavigate();

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
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
            <SearchBar value={keyword} setValue={changeKeyword} />
            {initializing ? (locale === 'id' ? 'Memuat catatan ...' : 'Fetching notes ...') : <NotesList notes={filteredNotes} />}
            <div className="homepage__action">
                <button className="action" type="button" title="New Note Button" onClick={() => navigate('/notes/new')}><HiMiniPlus /></button>
            </div>
        </section>
    );
}

export default HomePage;
