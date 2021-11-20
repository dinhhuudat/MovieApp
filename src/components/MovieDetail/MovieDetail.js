import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./MovieDetail.scss";
import axios from "axios";
import { moviesSlide } from "../../apis/moviedata";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination ,Thumbs,Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
 
SwiperCore.use([Autoplay]); 

const textStyle = {
  textAlign: "center",
  color: "red",
  backgroundImage: "linear-gradient(45deg, #f3ec78, #af4261)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat", 
};

const options = (id) => {
  return {
    method: "GET",
    url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
    params: { type: "get-movie-details", imdb: id },
    headers: {
      "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
      "x-rapidapi-key": "6699e351d5mshb4669476f69080ap19a2fdjsn21240e4fe251",
    },
  };
};

const MovieDetail = (props) => {
  const [dataMovieID, setDate] = useState();
  const [callMovies, setCallMovies] = useState(false);
  const trailerRef = useRef();
  const topRef = useRef();
  const { imdbID } = useParams();
  const history = useHistory();
  const [poster,setPoster]=useState(props.history.location.state); 
  const[thumbsSwiper,setThumbsSwiper]=useState(null)

  function scroll(ref) {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function pushHistory(id) { 
    history.push(`/MovieApp/${id}`);
    let flag=!callMovies
    setCallMovies(flag)
  }

  const swipperSlide = () => (
    <>
       <Swiper  
          autoplay={{ delay: 3000 }}
          spaceBetween={2}
          slidesPerView={4}  
          clickable={true}
          breakpoints={{
            // when window width is >= 640px
            640: { 
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: { 
              slidesPerView: 2,
            },
            1280:{ 
              slidesPerView: 4,
            }
          }}
          >
            {moviesSlide.map((movie) =>  
            (
            <SwiperSlide   tag="li" onClick={() => {
                                              pushHistory(movie.IMDB)
                                              setPoster(movie.poster)
                                              scroll(topRef)
                                              }}>
            <img   src={movie.poster} alt="Slide" />
            <div  >{movie.title}</div>
            </SwiperSlide>
            ) 
        )} 
        </Swiper> 
    </>
  );

  useEffect(() => {
    axios
      .request(options(imdbID))
      .then(function (response) {
        setDate(response.data);
      })
      .catch(function (error) {
        console.error("fail");
      });
  }, [callMovies]);

  const trailerDetail = () => (
    <div>
      <ul>
        <li style={textStyle}>
          <h3>{`NAME: ${dataMovieID.title.toUpperCase()}`}</h3>{" "}
        </li>
        <li>
          <h5>{`Tag line: ${dataMovieID.tagline}`}</h5>{" "}
        </li>
        <li>
          <b>Year</b>
          <i>{`: ${dataMovieID.year}`}</i>{" "}
        </li>
        <li>
          <b>Release</b>
          <i>{`: ${dataMovieID.release_date}`}</i>{" "}
        </li>
        <li>
          <b>Countries</b>
          <i>{`: ${dataMovieID.countries.toString(" ")}`}</i>{" "}
        </li>
        <li>
          <b>Imdb rate</b>
          <i>{`: ${dataMovieID.imdb_rating}`}</i>{" "}
        </li>
        <li>
          <b>Genres</b>
          <i>{`: ${dataMovieID.genres}`}</i>{" "}
        </li>
        <li>
          <b>Directors</b>
          <i>{`: ${dataMovieID.directors}`}</i>{" "}
        </li>
      </ul>
    </div>
  );

  const movieCardData = () => (
    <>
      <div className="cardDetail">
        <div className="cardTrailer">
          <ul>
            <li>
              <img
                src={poster}
                className="cardTrailer-img"
                onClick={() => scroll(trailerRef)}
              ></img>
            </li>
            <div
              className="cardTrailer-img-button"
              onClick={() => scroll(trailerRef)}
            >
              {" "}
              Trailer{" "}
            </div>
          </ul>
        </div>
        <div className="cardTrailerDetail">{trailerDetail()}</div>
      </div>

      <div className="cardDetail-content">
        <div className="cardDetail-content-header">CONTENT</div>
        <div className="cardDetail-content-description">
          {dataMovieID.description}
        </div>
      </div>

      <div className="cardDetail-trailer">
        <div className="cardDetail-content-header" ref={trailerRef}>
          TRAILER
        </div>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${dataMovieID.youtube_trailer_key}`}
        ></iframe>
      </div>
    </>
  );
 
  

  return (
    <div className="movieDetail-page" ref={topRef}>
      {dataMovieID ? movieCardData() : "LOADING DATA"}

      <div className="cardDetail">
        
           {swipperSlide()}  
      </div>
    </div>
  );
};

export default MovieDetail;
