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
    const [error, setError] = useState(null);

    const fetchGif = (data) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&q=${data}&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => {
                if(result.data.length > 0) { 
                    setGifData(result.data);
                } else { 
                    setError("Search Not found!");
                    setGifData(null);
                }
            });
    };

    const fetchTrending = () => {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => setGifData(result.data));
    };

    useEffect(() => {
        let searchQuery = getQueryStrings(history);

        if(searchQuery.search) {
            searchValue && setRecentSearch([searchQuery.search, ...recentSearch]);
            setSearchValue(searchQuery.search);
            fetchGif(searchQuery.search);
        } else if(searchQuery.trending) {
            fetchTrending();
        } else {
            setError("Something went wrong, please try again!");
            setGifData(null);
        }

    }, []);

    const recentSearchHandler = (data) => {
        let recentSearchClone =  [...recentSearch];
        let index = recentSearchClone.indexOf(data);

        recentSearchClone.splice(index, 1);

        if (data === searchValue) {
            if (recentSearchClone.length > 4) recentSearchClone.length = 4;
            setRecentSearch([data, ...recentSearchClone]);
        } else {
            if (recentSearchClone.length > 4) recentSearchClone.length = 4;
            setRecentSearch([searchValue, ...recentSearchClone]);
        }

        submitHandler(data, true);
    }

    const submitHandler = (data, reset = false) => {
        if(searchValue && !reset) {
            let recentSearchClone = [...recentSearch];
            let index = recentSearchClone.indexOf(data);
            index > -1 && recentSearchClone.splice(index, 1);

            if(searchValue !== data) {
                if(recentSearchClone.length > 4) recentSearchClone.length = 4;
                setRecentSearch([searchValue, ...recentSearchClone]);
            }
        }

        fetchGif(data);
        setSearchValue(data);
        setError(null);
        history.push({pathname: '/search', search: `search=${data}`});
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
                recentSearch.length > 0  && <React.Fragment>
                <span>Recent search :</span>
                {
                    recentSearch.map(item => <button aria-label="recent" key={item} className="recentSearch" onClick={() => recentSearchHandler(item)}>{item}</button>)
                }
                </React.Fragment>
            }
        </div>
        { error && <span className="error">{error}</span>}
        { gifData && <Gallery images={getPhotoList()} />}
    </div>
};

export default Search;
