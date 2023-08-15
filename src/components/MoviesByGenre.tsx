import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../redux";
import {MovieList} from "./MovieList";
import {MovieCard} from "./MovieCard";

const MoviesByGenre = () => {

    const dispatch = useAppDispatch();

    const {moviesByGenre, genresPage, total_genrePage} = useAppSelector(state => state.movieReducer);

    const [params, setParams] = useSearchParams();

    const genreId = params.get('genreId');

    const page = params.get('page')

    useEffect(() => {
        dispatch(movieActions.getMoviesByGenre({genreId, page}))
    }, [genreId, page, dispatch])

    console.log(moviesByGenre)

    return (
        <div>
            {moviesByGenre && moviesByGenre.map(item=> <MovieCard key={item.id} movie={item}/>)}
        </div>
    );
};

export {MoviesByGenre}
