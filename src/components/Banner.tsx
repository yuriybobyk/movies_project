import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";

const Banner = () => {

    const {movieInfo} = useAppSelector(state => state.movieReducer)

    const dispatch = useAppDispatch();

    useEffect(()=>{

        const movieId= 447277
        dispatch(movieActions.getMovieInfo(movieId))
        console.log(movieInfo)
    },[dispatch])

    return (
        <div>

        </div>
    );
};

export {Banner}
