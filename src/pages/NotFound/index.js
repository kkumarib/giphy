import React from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import './notFound.css';

const NotFound = () => {
    
    return <>
        <Helmet title="Not Found"/>
        <div className="errorContainer">
        <i className="fa fa-exclamation-triangle"/>
        <span>404 Not Found</span>
        <br/>
        <span className="nav">Click <Link to="/">here</Link> for Home page.</span>
    </div></>
}

export default NotFound;
