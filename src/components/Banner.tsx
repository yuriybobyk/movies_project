import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";
import {backDropURL, posterURL} from "../constants";
import {IMovie} from "../interfaces/movie.interface";
import {FaPlay} from "react-icons/fa";
import {InformationCircleIcon} from "@heroicons/react/solid";


const Banner = () => {
    const [movie, setMovie] = useState<IMovie | null>(null)

    const {movies} = useAppSelector(state => state.movieReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getMovies({page: '1'}));

    }, [dispatch])

    useEffect(() => {
        if (movies.length > 0) {
            const randomId = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomId])
        }
    }, [movies])


    console.log(movies)


    return (
        <div>
            {movie && (
                <div className="flex flex-col space-y-2 py-16 md: space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
                    <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                        <img className="w-full h-full object-cover"
                             src={`${backDropURL}${movie?.backdrop_path}`} alt={'back'}
                             style={{}}/>
                    </div>
                    <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                        {movie?.overview}
                    </p>
                    <div className="flex space-x-3">
                        <button className="bannerButton bg-white text-black"><FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 "/></button>
                        <button className="bannerButton bg-[gray]/70">More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export {Banner}
