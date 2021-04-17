import React, { useState, useEffect } from 'react';
import './searchBar.css';

function SearchBar(props) {
    const [keyword, updateKeyword] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        keyword && props.onSubmitHandler(keyword)
    }

    useEffect(() => {
        props.searchKey && updateKeyword(props.searchKey);
    }, [props.searchKey])

    return <form className="SearchBar" onSubmit={onSubmitHandler}>
        <input name="search" type="text" value={keyword} placeholder="Search" onChange={(e) => updateKeyword(e.target.value)}/>
        <button type="submit"><i className="fa fa-search"></i></button>
        </form>
};

export default SearchBar;
