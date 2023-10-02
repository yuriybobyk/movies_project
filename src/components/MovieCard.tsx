import React, {FC} from 'react';
import {IMovie} from "../interfaces/movie.interface";
import {posterURL} from "../constants";

interface IProps {
    movie: IMovie
    onCardClick: (movieId: number) => void;

}

const MovieCard: FC<IProps> = ({movie, onCardClick}) => {
    const handleCardClick = () => {
    onCardClick(movie.id);
    }


    const {poster_path, title} = movie

    const getPoster = `${posterURL}${poster_path}`

    return (
        <div className="w-[360px] cursor-pointer" onClick={handleCardClick}>
            <img src={getPoster} alt={title}/>
        </div>
    );
};

export {MovieCard}
