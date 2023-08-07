import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";
import {posterURL} from "../constants";
import {IMovie} from "../interfaces/movie.interface";


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
        <div className="flex flex-col space-y-2 py-16 md: space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            {movie && (
                <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                    <img className="w-full h-full object-cover object-center" src={`${posterURL}${movie?.poster_path || movie?.backdrop_path}`} alt={'back'} style={{

                    }}/>
                </div>
            )}
        </div>
    );
};

export {Banner}
