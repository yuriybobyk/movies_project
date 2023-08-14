import {IRes} from "../types";

import {axiosService} from "./axios.service";
import {movieEndPoints} from "../constants";
import {IMovieData} from "../interfaces/movie.data";
import {IMovie} from "../interfaces/movie.interface";
import {AxiosResponse} from "axios";

class MovieService {
    getMovies(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.movies}`, {params: {page}})
    }

    getMovieInfo(id: number): IRes<IMovie> {
        return axiosService.get(`${movieEndPoints.movieInfo}/${id}`)
    }

    getNewPopular(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.newPopular}`, {params: {page}})
    }

    getTvShows(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.tv}`, {params: {page}})
    }

    getNowPlaying(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.nowPlaying}`, {params: {page}})
    }

    getTrending(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.trending}`, {params: {page}})
    }

    getTopRatedMovies(page: string): IRes<IMovieData> {
        return axiosService.get(`${movieEndPoints.topRated}`, {params: {page}})
    }

    getGenres(): Promise<AxiosResponse> {
        return axiosService.get(`${movieEndPoints.genres}`)
    }
}

export const movieService = new MovieService()
