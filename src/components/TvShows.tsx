import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../redux";
import {MovieCard} from "./MovieCard";
import {Pagination, styled} from "@mui/material";
import {MovieModal} from "./MovieModal";

const TvShows = () => {

    const dispatch = useAppDispatch();

    const {tvShows, loading, page, isModalOpen} = useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams();

    const choosenPage = query.get('page');

    useEffect(() => {
        dispatch(movieActions.getTvShows({page: choosenPage}))
    }, [dispatch, choosenPage]);

    const handleMovieCardClick = (movieId: number) => {
        dispatch(movieActions.openModal());
        dispatch(movieActions.getMovieInfo(movieId))
    };

    const handleModalClose = () => {
        dispatch(movieActions.closeModal());
    };

    const CustomPagination = styled(Pagination)(({theme}) => ({
        '& .MuiPaginationItem-root': {
            color: 'white',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: 'red',
        },
        '& .MuiPaginationItem-page.Mui-selected:hover': {
            backgroundColor: 'darkred',
        },
        '& .MuiPaginationItem-page:hover': {
            backgroundColor: 'lightcoral',
        },
    }));


    return (
        <main className="w-full flex items-center justify-center">
            {loading ? <div
                    className=" absolute top-1/3 left-1/2 inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"><span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div> :
                <div className="flex w-full items-center justify-center p-4 flex-col">
                    <section className="flex w-full  flex-wrap gap-3 top-24 items-center  mt-16">
                        {tvShows && tvShows.map(tvShow => <MovieCard onCardClick={handleMovieCardClick} movie={tvShow}
                                                                     key={tvShow.id}/>)}
                    </section>
                    <div className="w-full flex justify-center">
                        <div className="flex justify-center w-[900px] ">
                            <CustomPagination
                                size="large"
                                shape="rounded"
                                variant="text"
                                sx={{marginY: 2}}
                                count={500}
                                page={+page}
                                onChange={(_, num) => setQuery({page: `${num}`})}
                            /></div>
                    </div>
                </div>
            }
            {isModalOpen && (
                <MovieModal onClose={handleModalClose}/>
            )}
        </main>
    );
};

export {TvShows};
