import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../redux";
import {MovieCard} from "./MovieCard";

const MovieList = () => {

    const {movies, page, loading} = useAppSelector(state => state.movieReducer)
    const [query, setQuery] = useSearchParams()

    const choosenPage = query.get('page')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getMovies({page: choosenPage}))
    }, [dispatch, choosenPage])

    console.log(movies)

    return (
        <main className="flex items-center justify-center p-4">
            {loading ?
                <div
                    className="relative top-1/2 bottom-1/2 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"><span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div> :
                <section className="flex flex-wrap gap-3 relative top-24 items-center ml-16">
                    {movies && movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
                </section>

            }

        </main>
    );
};

export {MovieList}
