const baseMovieURL = 'https://api.themoviedb.org/3';

const posterURL = 'https://image.tmdb.org/t/p/w500'
const backDropURL = 'https://image.tmdb.org/t/p/original'

const movieEndPoints = {
    movies: '/discover/movie',
    movieInfo: '/movie',
    trending: '/trending/all/week?',
    newPopular: 'trending/movie/day',
    tv: '/discover/tv'
}

export {baseMovieURL, movieEndPoints, posterURL, backDropURL}
