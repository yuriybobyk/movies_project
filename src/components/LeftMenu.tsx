import React, {useEffect} from 'react';
import {XIcon} from "@heroicons/react/solid";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const LeftMenu = ({isOpen, onClose}: IProps) => {

    const menuClassName = isOpen
        ? 'left-menu open translate-x-0'
        : 'left-menu -translate-x-full';

    const {genresList} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getGenresList())
    }, [dispatch])

    return (
        <div
            className={`fixed top-0 left-0 w-64 h-full bg-[#191919] p-8 z-10 transform transition-transform duration-700 flex flex-col gap-4 ${menuClassName}`}>
            {genresList && genresList.map(genre => <div className="text-xl" key={genre.id}>{genre.name}</div>)}
            {isOpen && (<XIcon onClick={onClose} className="h-6 w-6 cursor-pointer absolute top-4 right-4"/>)}
        </div>
    );
};

export {LeftMenu};
