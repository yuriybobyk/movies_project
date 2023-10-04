import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useLocation, useSearchParams} from "react-router-dom";
import {movieActions} from "../redux";
import {MovieCard} from "./MovieCard";
import {Pagination, styled} from "@mui/material";
import {MovieModal} from "./MovieModal";

const MoviesByGenre = () => {

    const dispatch = useAppDispatch();

    const {
        moviesByGenre,
        genresPage,
        total_genrePage,
        loading,
        isModalOpen,
        trailer
    } = useAppSelector(state => state.movieReducer);

    const [params, setParams] = useSearchParams();

    const genreId = params.get('genreId');

    const page = params.get('page')

    useEffect(() => {
        dispatch(movieActions.getMoviesByGenre({genreId, page}))
    }, [dispatch, genreId, page]);

    const handleMovieCardClick = (movieId: number) => {
        dispatch(movieActions.openModal());
        dispatch(movieActions.getMovieInfo(movieId))
        dispatch(movieActions.getTrailer(movieId))
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
                        {moviesByGenre && moviesByGenre.map(movieByGenre => <MovieCard
                            onCardClick={handleMovieCardClick} key={movieByGenre.id} movie={movieByGenre}/>)}
                    </section>
                    <div className="w-full flex justify-center">
                        <CustomPagination
                            size="large"
                            shape="rounded"
                            variant="text"
                            sx={{marginY: 2}}
                            count={total_genrePage < 500 ? total_genrePage : 500} page={+genresPage}
                            onChange={(_, num) => setParams({genreId: genreId, page: `${num}`})}
                        />
                    </div>
                </div>
            }
            {isModalOpen && (
                <MovieModal onClose={handleModalClose} trailer={trailer}/>
            )}
        </main>
    );
};

export {MoviesByGenre}
