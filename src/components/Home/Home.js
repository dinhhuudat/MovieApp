import React,{useEffect} from 'react';
import MovieListing from '../MovieListing/MovieListing' ;
import {poster} from '../../apis/moviedata';

const Home = (props) => {   

    return (
        <>
        <div className="banner-img"></div>
        <MovieListing data={poster}/>
        </>
    );
};

export default Home;