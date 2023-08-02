import {IRes} from "../types";
import {IMovie} from "../interfaces/movie.interface";
import {axiosService} from "./axios.service";
import {movieEndPoints} from "../constants";
import {IMovieData} from "../interfaces/movie.data";

const movieService = {
    getMovies: (page: string):IRes<IMovieData> =>axiosService.get(movieEndPoints.movies, {params: {page}}),
    getMovieInfo: (id:number): IRes<IMovie> =>axiosService.get(`${movieEndPoints.movieInfo}/${id}`)
}

export {movieService}
