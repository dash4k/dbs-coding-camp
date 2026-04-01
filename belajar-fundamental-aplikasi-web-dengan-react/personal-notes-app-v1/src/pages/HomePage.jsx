import React from "react";
import { getActiveNotes } from "../utils/local-data";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import { HiMiniPlus } from "react-icons/hi2";

function HomePageWrapper() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <HomePage navigate={navigate} defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getActiveNotes(),
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
            <section className="homepage">
                <h2>Catatan Aktif</h2>
                <SearchBar value={this.state.keyword} setValue={this.onKeywordChange} />
                <NotesList notes={notes} />
                <div className="homepage__action">
                    <button className="action" type="button" title="New Note Button" onClick={() => this.props.navigate('/notes/new')}><HiMiniPlus /></button>
                </div>
            </section>
        )
    }
}

export default HomePageWrapper;
