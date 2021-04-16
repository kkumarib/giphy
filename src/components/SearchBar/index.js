import React, { useState, useEffect } from 'react';
import './searchBar.css';

function SearchBar(props) {
    const [keyword, updateKeyword] = useState(null);

    useEffect(() => {
        props.searchKey && updateKeyword(props.searchKey);
    }, [props.searchKey])

    return <div className="SearchBar">
        <input name="search" type="text" value={keyword} placeholder="Search" onChange={(e) => updateKeyword(e.target.value)}/>
        <button type="submit" onClick={() => props.onSubmitHandler(keyword)} ><i className="fa fa-search"></i></button>
        </div>
};

export default SearchBar;