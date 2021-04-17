import React from 'react';
import SearchBar from '../../components/SearchBar';
import { useHistory } from "react-router-dom";
import './home.css';

function Home() {
    let history = useHistory();

    const submitHandler = (data) => {
        history.push({pathname: '/search', search:`?${typeof(data) == 'object' ? 'trending=true' : `search=${data}`}`});
    }

    return <div className="container">
        <SearchBar onSubmitHandler={submitHandler}/>
        <br/>
        <span>Quick link : </span>
        <button className="trending" type="submit" onClick={submitHandler}><i className="fa fa-line-chart"/>Trending gif</button>
    </div>
}

export default Home;
