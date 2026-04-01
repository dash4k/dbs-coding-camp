import React from "react";
import NotesList from "../components/NotesList";
import { getArchivedNotes } from "../utils/local-data";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function ArchivePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getArchivedNotes(),
            keyword: this.props.defaultKeyword || ''
        }

        this.onKeywordChange = this.onKeywordChange.bind(this);
    }

    onKeywordChange(e) {
        this.setState(() => {
            return {
                keyword: e.target.value
            };
        });

        this.props.keywordChange(e.target.value);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <section className="archives-page">
                <h2>Catatan Arsip</h2>
                <SearchBar value={this.state.keyword} setValue={this.onKeywordChange} />
                <NotesList notes={notes} />
            </section>
        )
    }
}

export default ArchivePageWrapper;
