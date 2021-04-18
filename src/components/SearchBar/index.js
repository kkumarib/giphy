import React, { useState, useEffect } from 'react';
import './searchBar.css';

function SearchBar(props) {
    const [keyword, updateKeyword] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        keyword && props.onSubmitHandler(keyword.trim())
    }

    useEffect(() => {
        props.searchKey && updateKeyword(props.searchKey);
    }, [props.searchKey])

    return <form className="SearchBar" data-testid="form" onSubmit={onSubmitHandler}>
        <input aria-label="Search" name="search" type="text" value={keyword} placeholder="Search" onChange={(e) => updateKeyword(e.target.value)}/>
        <button type="submit" aria-label="Searchsubmit" role="submit"><i className="fa fa-search"></i></button>
        </form>
};

export default SearchBar;
