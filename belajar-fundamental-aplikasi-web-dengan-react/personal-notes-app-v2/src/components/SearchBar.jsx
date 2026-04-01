import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ value, setValue }) {
    const locale = React.useContext(LocaleContext);
    
    return (
        <section className="search-bar">
            <input type="text" placeholder={locale === 'id' ? "Cari berdasarkan judul ..." : "Search by title ..."} value={value} onChange={setValue} />
        </section>
    );
}

export default SearchBar;
