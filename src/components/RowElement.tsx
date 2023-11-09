import React, {FC} from 'react';
import {IMovie} from "../interfaces/movie.interface";
import {posterURL} from "../constants";

interface IProps{
    movie: IMovie
    onCardClick: (movieId: number) => void;
}

const RowElement:FC<IProps> = ({movie, onCardClick}) => {

    const {poster_path, title} = movie

    const handleCardClick = () => {
        onCardClick(movie.id);
    }

    const getPoster =`${posterURL}${poster_path}`
    return (
        <div className="relative h-78 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-74 md:min-w-[240px] md:hover:scale-105 sm:min-w-[270px]" onClick={handleCardClick}>
            <img className="rounded-sm object-cover  inset-0 w-full h-full md:rounded" src={getPoster} alt={title}/>
        </div>
    );
};

export {RowElement};
