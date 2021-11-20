import React from 'react';
import './MovieCard.scss';
import {useHistory,useLocation  } from 'react-router-dom';

const MovieCard = (props) => {
    let history = useHistory();
    const location = useLocation();
    const currentPath=location.pathname
    const {data}=props;  
    const poster=data.poster

    function callMovieDetail(){
        // console.log(`push:${currentPath}/${data.imdb_id}`)
        history.push(`${currentPath}${data.IMDB}`,poster)
    }

    return (
        <div className="card-item"  onClick={()=>callMovieDetail()}> 
            <div className="card-inner">
                <div className="card-top">
                    <img src={data.poster} alt={data.title}/>
                </div>
                <div className="card-bottom">
                    <div className="card-info">
                        <h4>{data.title}</h4> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;