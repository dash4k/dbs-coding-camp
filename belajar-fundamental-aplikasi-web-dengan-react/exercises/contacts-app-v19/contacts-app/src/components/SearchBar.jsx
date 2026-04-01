import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
    return (
        <LocaleConsumer>
        {
            ({ locale }) => {
                return (
                    <input 
                        className="search-bar"
                        type="text" 
                        placeholder={locale === 'id' ? 'Cari berdasarkan nama' : 'Search by name'}
                        value={keyword}
                        onChange={(event) => keywordChange(event.target.value)}
                    />
                )
            }
        }
        </LocaleConsumer>
    )
}

export default SearchBar;
