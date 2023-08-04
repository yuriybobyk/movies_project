import React, {FC} from 'react';
import {IMovie} from "../interfaces/movie.interface";
import {posterURL} from "../constants";

interface IProps{
    movie: IMovie
}

const MovieCard:FC<IProps> = ({movie}) => {

    const {backdrop_path, poster_path, title} = movie

    const getPoster =`${posterURL}${poster_path}`

    return (
        <div className="w-[360px]  ">
            <img src={getPoster} alt={title}/>
        </div>
    );
};

export {MovieCard}
