import axios from 'axios';

export default axios.create({
    baseUrl: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
});
  

// const options = {
//   method: 'GET',
//   url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//   params: {type: 'get-trending-movies', page: '1'},
//   headers: {
//     'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//     'x-rapidapi-key': '6699e351d5mshb4669476f69080ap19a2fdjsn21240e4fe251'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });