import React, {useEffect, useRef, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import {useAppDispatch, useAppSelector} from "../hooks";
import {RowElement} from "./RowElement";
import {movieActions} from "../redux";
import {MovieModal} from "./MovieModal";
import {useLocation} from "react-router-dom";

interface IProps {
    title: string
}

const NowPalyingRow = ({title}: IProps) => {

    const rowRef = useRef<HTMLDivElement>(null);
    const [moved, setMoved] = useState(false);

    const handleCkick = (direction: string) => {
        setMoved(true)
        if (rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
    }

    const dispatch = useAppDispatch();

    const {nowPlaying, isModalOpen, trailer} = useAppSelector(state => state.movieReducer)

    useEffect(() => {
        dispatch(movieActions.getNowPlaying({page: '1'}))
    }, [dispatch])

    const handleMovieCardClick = (movieId: number) => {
        dispatch(movieActions.openModal());
        dispatch(movieActions.getMovieInfo(movieId))
        dispatch(movieActions.getTrailer(movieId))
    };

    const handleModalClose = () => {
        dispatch(movieActions.closeModal());
    };

    return (
        <div className="h-80 space-y-0.5 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
                        !moved && 'hidden'
                    }`}
                    onClick={() => handleCkick('left')}/>
                <div ref={rowRef}
                     className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
                    {nowPlaying && nowPlaying.map(nowPlay => <RowElement onCardClick={handleMovieCardClick}
                                                                         movie={nowPlay} key={nowPlay.id}/>)}
                </div>
                <ChevronRightIcon
                    className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
                    onClick={() => handleCkick('right')}
                />
            </div>
            {isModalOpen && (
                <MovieModal onClose={handleModalClose} trailer={trailer}/>
            )}
        </div>
    );
};

export {NowPalyingRow}
