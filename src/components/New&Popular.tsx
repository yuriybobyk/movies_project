import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../redux";
import {MovieCard} from "./MovieCard";


const NewPopular = () => {

    const dispatch = useAppDispatch();

    const {newPopularMovies, page, loading}=useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams();

    const choosenPage = query.get('page')

    useEffect(()=>{
        dispatch(movieActions.getNewPopular({page: choosenPage}))

    },[dispatch, choosenPage])

    return (
        <div>
            {newPopularMovies && newPopularMovies.map(newPopular=> <MovieCard key={newPopular.id} movie={newPopular}/>) }
        </div>
    );
};

export {NewPopular};
