import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Gallery from "react-grid-gallery";
import { useHistory } from "react-router-dom";
import { Gif, Grid, Carousel } from "@giphy/react-components";
import './search.css';

function Search(props) {
    let history = useHistory();

    const [gifData, setGifData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        const params = history.location.search;
        const searchValue = params.split('=')[1]; 
        if(searchValue === "") {
            fetch(`https://api.giphy.com/v1/gifs/trending?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => setGifData(result.data));
        } else {
            setSearchValue(searchValue);
            submitHandler(searchValue);
        }
    })

    const submitHandler = (data) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=mAt36dZTCYPPpU406rL0JDTJnsIlfemw&q=${data}&limit=50&offset=0&rating=g&lang=en`)
            .then(response => response.json())
            .then(result => setGifData(result.data));
    }

    const getPhotoList = () => {
        let photoList = [];

        gifData.map(gif => {
            photoList.push(
                {
                    src: gif.images.fixed_height_small.url,
                    thumbnail: gif.images.fixed_height_small.url,
                    thumbnailWidth: parseInt(gif.images.fixed_height_small.width),
                    thumbnailHeight: parseInt(gif.images.fixed_height_small.height),
                    isSelected: false,
                    caption: gif.title,
                });
        });

        return photoList;
    }

    return <div className="Container">
        <div className="Search">
            <SearchBar searchKey={searchValue} onSubmitHandler={submitHandler} />
        </div>
        {
            gifData && <Gallery images={getPhotoList()} />
        }
    </div>
};

export default Search;
