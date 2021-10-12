import React,{useEffect} from 'react';
import MovieListing from '../MovieListing/MovieListing'
import movieApi from '../../apis/movieApi';
import {APIkey} from '../../apis/movieApiKey';
import {useDispatch} from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice';


const Home = () => {
    const dispatch=useDispatch()
    const movieText='Harry'

    useEffect(() => {
        const fetchMovie= async ()=>{
            const  response=await fetch(`http://www.omdbapi.com?apikey=${APIkey}&s=${movieText}&type=movie`)
             
            // console.log('THe response:',await response.json())
            dispatch(addMovies(await response.json()))
        }

        fetchMovie()
        return () => {
             console.log('Api fail')
        }
    }, [])

    return (
        <>
        <div className="banner-img"></div>
        <MovieListing/>
        </>
    );
};

export default Home;