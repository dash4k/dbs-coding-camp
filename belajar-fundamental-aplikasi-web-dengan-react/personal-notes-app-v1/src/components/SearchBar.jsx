import React from "react";

function SearchBar({ value, setValue }) {
    return (
        <section className="search-bar">
            <input type="text" placeholder="Cari berdasarkan judul ..." value={value} onChange={setValue} />
        </section>
    );
}

export default SearchBar;
