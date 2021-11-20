import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = (props) => {
  const movies = props.data; 

  let renderMovies = "";
  renderMovies = movies
    ? movies.map((movie, index) => (
        <>
          <MovieCard key={index} data={movie} />
        </>
      ))
    : "none";

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>MOVIES</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
    </div>
  );
};

export default MovieListing;
