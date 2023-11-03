import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks';
import { movieActions } from '../redux';
import { MovieCard } from './MovieCard';
import {MovieModal} from "./MovieModal";
import {Pagination, styled} from "@mui/material";

const SearchResult = () => {

    const{ query } = useParams<{query:string}>();
    const dispatch = useAppDispatch();
    const {searchMovies, loading, searchPage, total_searchPage, isModalOpen, trailer} = useAppSelector((state)=> state.movieReducer);

    const [params, setParams] = useSearchParams();

    const page = params.get('page')

    const handleMovieCardClick = (movieId: number) => {
        dispatch(movieActions.openModal());
        dispatch(movieActions.getMovieInfo(movieId))
        dispatch(movieActions.getTrailer(movieId))
    };

    const handleModalClose = () => {
        dispatch(movieActions.closeModal());
    };

    useEffect(()=>{
        if(query){
            dispatch(movieActions.searchMovies({query, page}))
        }
    },[dispatch, query, page])

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
                {searchMovies && searchMovies.map(searchMovie => <MovieCard
                    onCardClick={handleMovieCardClick} key={searchMovie.id} movie={searchMovie}/>)}
            </section>
            <div className="w-full flex justify-center">
                <CustomPagination
                    size="large"
                    shape="rounded"
                    variant="text"
                    sx={{marginY: 2}}
                    count={total_searchPage < 500 ? total_searchPage : 500} page={+searchPage}
                    onChange={(_, num) => setParams({ page: `${num}` })}
                />
            </div>
        </div>
    }
    {isModalOpen && (
        <MovieModal onClose={handleModalClose} trailer={trailer}/>
    )}
</main>
  )
}

export default SearchResult