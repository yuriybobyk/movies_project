import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { movieActions } from "../redux";
import { backDropURL } from "../constants";
import { IMovie } from "../interfaces/movie.interface";
import { FaPause, FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { MovieModal } from "./MovieModal";
import ReactPlayer from 'react-player';

const Banner = () => {
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trailerType, setTrailerType] = useState(null);
    const [isStopped, setIsStopped] = useState(false);

    const { movies, isModalOpen, trailer } = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getMovies({ page: '1' }));
    }, [dispatch]);

    useEffect(() => {
        if (movies.length > 0) {
            const randomId = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomId]);
        }
    }, [movies]);

    const handleMovieCardClick = (movieId: number) => {
        dispatch(movieActions.openModal());
        dispatch(movieActions.getMovieInfo(movieId));
        dispatch(movieActions.getTrailer(movieId));
    };

    const handleModalClose = () => {
        dispatch(movieActions.closeModal());
    };

    const handlePlayClick = (movieId: number) => {
        if (isPlaying) {
            setIsPlaying(false); 
        } else {
            dispatch(movieActions.getTrailer(movieId));
        }
    };

    useEffect(() => {
        if (trailer && trailer.results && trailer.results.length > 0) {
            const type = trailer.results.find((video) => video.type === 'Trailer');
            setTrailerType(type);
            setIsPlaying(true);
            if (isStopped) {
                setIsPlaying(false);
            }
        }
    }, [trailer, isStopped]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsStopped(true);
            } if(window.scrollY === 0){
                setIsStopped(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main>
            {movie && (
                <div className="flex flex-col space-y-2 py-16 md: space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
                    <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                        {isPlaying && !isStopped && trailer ? (
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailerType?.key}`}
                                playing={isPlaying}
                                width="100%"
                                height="100%"
                            />
                        ) : (
                            <img
                                className="w-full h-full object-cover"
                                src={`${backDropURL}${movie?.backdrop_path}`}
                                alt="back"
                            />
                        )}
                    </div>
                    <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                        {movie?.overview}
                    </p>
                    <div className="flex space-x-3">
                        <button className="bannerButton bg-white text-black" onClick={() => handlePlayClick(movie.id)}>
                            <FaPlay
                                className={`h-4 w-4 text-black md:h-7 md:w-7 ${isPlaying ? 'hidden' : ''}`}
                            />
                            <FaPause
                                className={`h-4 w-4 text-black md:h-7 md:w-7 ${isPlaying ? '' : 'hidden'}`}
                            />
                        </button>
                        <button className="bannerButton bg-[gray]/70" onClick={() => handleMovieCardClick(movie.id)}>
                            More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                        </button>
                    </div>
                </div>
            )}
            {isModalOpen && <MovieModal onClose={handleModalClose} trailer={trailer} />}
        </main>
    );
};

export { Banner };
