import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Gallery from "react-grid-gallery";
import { useHistory } from "react-router-dom";
import { getQueryStrings } from "../../utlis/helper";
import './search.css';

function Search() {
    let history = useHistory();

    const [gifData, setGifData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [recentSearch, setRecentSearch] = useState([]);

    const fetchGif = (data) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&q=${data}&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => setGifData(result.data));
    };

    const fetchTrending = () => {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => setGifData(result.data));
    };

    useEffect(() => {
        let searchQuery = getQueryStrings(history);

        if(searchQuery.trending) {
            fetchTrending();
        } else {
            searchValue && setRecentSearch([searchQuery.search, ...recentSearch]);
            setSearchValue(searchQuery.search);
            fetchGif(searchQuery.search);
        }
    }, []);

    const recentSearchHandler = (data) => {
        let index = recentSearch.indexOf(data);
        let recentSearchClone =  [...recentSearch];
        
        recentSearchClone.splice(index, 1);
        setRecentSearch([data, searchValue, ...recentSearchClone]);
        submitHandler(data, true);
    }

    const submitHandler = (data, reset = false) => {
        fetchGif(data);
        searchValue && !reset && setRecentSearch([searchValue, ...recentSearch]);
        setSearchValue(data);
        history.push({pathname: '/search'})
    }

    const getPhotoList = () => {
        let photoList = [];

        gifData.map(gif => {
            photoList.push(
                {
                    src: gif.images.original.url,
                    thumbnail: gif.images.original.url,
                    thumbnailWidth: parseInt(gif.images.original.width),
                    thumbnailHeight: parseInt(gif.images.original.height),
                    isSelected: false,
                    caption: gif.title,
                });
        });

        return photoList;
    }

    return <div className="Container">
        <div className="Search">
            <SearchBar searchKey={searchValue} onSubmitHandler={submitHandler} />
            {
                recentSearch.length > 0  && <>
                <span>Recent search :</span>
                {
                    recentSearch.map(item => <button className="recentSearch" onClick={() => recentSearchHandler(item)}>{item}</button>)
                }
                </>
            }
        </div>
        { gifData && <Gallery images={getPhotoList()} />}
    </div>
};

export default Search;
