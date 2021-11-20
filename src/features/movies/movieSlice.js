import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    movies:[],
}
 
const optionsGetTrendingFeed =(pageNum)=> {return{
  method: 'GET',
  url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
  params: {type: 'get-trending-movies', page: pageNum},
  headers: {
    'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
    'x-rapidapi-key': '6699e351d5mshb4669476f69080ap19a2fdjsn21240e4fe251'
  }
}};



 export const getFeedApiMovie=createAsyncThunk('movie/TrendingFeed',async (pageNumber) => {
    const response = await axios.request(optionsGetTrendingFeed(pageNumber))
    console.log('dataTrending:',await response.data)
    return await response.data
  })
 

const movieSlice=createSlice({
        name:'movies',
        initialState,
        reducers:{
            addMovies:(state,{payload})=>{
                state.movies=payload;
            }
        },
        extraReducers:(builder) => {
            builder
              .addCase(getFeedApiMovie.pending, (state, action) => {
                console.log('getFeedApiMovie pending')
                })
            .addCase(getFeedApiMovie.fulfilled, (state, action) => {
                console.log('getFeedApiMovie fulfilled:',action.payload)
                console.log('state fulfilled:',state)
                state.movies.push(action.payload)
                })             
        }      
    })

    export const {addMovies} =movieSlice.actions;
    export const getAllmovie =(state)=>(state.moviesReducer.movies);
    export default movieSlice.reducer;