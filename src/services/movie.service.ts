import {IRes} from "../types";

import {axiosService} from "./axios.service";
import {movieEndPoints} from "../constants";
import {IMovieData} from "../interfaces/movie.data";
import {IMovie} from "../interfaces/movie.interface";

class MovieService {
    getMovies(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.movies}`, {params: {page}})
    }

     getMovieInfo(id:number): IRes<IMovie>{
        return axiosService.get(`${movieEndPoints.movieInfo}/${id}`)
    }
}

export const movieService = new MovieService()
