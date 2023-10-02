import {IMovie} from "../../interfaces/movie.interface";
import {createAction, createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";
import {movieService} from "../../services";
import {AxiosError} from "axios";
import {IMovieData} from "../../interfaces/movie.data";
import {IGenre} from "../../interfaces/genre.interface";

interface IState {
    movies: IMovie[];
    page: number;
    genresPage: number
    total_pages: number;
    total_genrePage: number
    moviesByGenre: IMovie[];
    movieInfo: IMovie;
    loading: boolean;
    newPopularMovies: IMovie[];
    tvShows: IMovie[];
    nowPlaying: IMovie[];
    trending: IMovie[];
    topRatedMovies: IMovie[];
    genresList: IGenre[];
    thrillerMovies: IMovie[];
    comedyMovies: IMovie[];
    familyMovies: IMovie[];
    searchMovies: IMovie[];
    isModalOpen: boolean;
    modalMovie: null;


}

const initialState: IState = {
    movies: [],
    page: null,
    total_pages: null,
    moviesByGenre: [],
    movieInfo: null,
    loading: false,
    newPopularMovies: [],
    tvShows: [],
    nowPlaying: [],
    trending: [],
    topRatedMovies: [],
    genresList: [],
    genresPage: null,
    total_genrePage: null,
    thrillerMovies: [],
    comedyMovies: [],
    familyMovies: [],
    searchMovies: [],
    isModalOpen: false,
    modalMovie: null

}

const getMovieInfo = createAsyncThunk<IMovie, number>(
    'movieSlice/getMovieInfo',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieInfo(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getMovies = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovies(page)
            await new Promise(resolve => setTimeout(resolve, 600))
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getNewPopular = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getNewPopular',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getNewPopular(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getTvShows = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getTvShows',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTvShows(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getNowPlaying = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getNowPlaying',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getNowPlaying(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getTrending = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getTrending',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTrending(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getTopRatedMovies = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getTopRatedMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTopRatedMovies(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getGenresList = createAsyncThunk<IGenre[], undefined>(
    'movieSlice/getGenresList',
    async (_, {rejectWithValue}) => {
        try {
            const {data: {genres}} = await movieService.getGenres();
            return genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getMoviesByGenre = createAsyncThunk<IMovieData, { genreId: string, page: string }>(
    'movieSlice/getMoviesByGenre',
    async ({genreId, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMoviesByGenre(genreId, page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getThrillerMovies = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getThrillerMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const genreId = '53';
            const {data} = await movieService.getMoviesByGenre(genreId, page);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const getComedyMovies = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getComedyMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const genreId = '35';
            const {data} = await movieService.getMoviesByGenre(genreId, page);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const getFamilyMovies = createAsyncThunk<IMovieData, { page: string }>(
    'movieSlice/getFamilyMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const genreId = '10751'
            const {data} = await movieService.getMoviesByGenre(genreId, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const searchMovies = createAsyncThunk<IMovieData, { query: string; page: string }>(
    'movieSlice/searchMovies',
    async ({query, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchMovies(query, page);
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const openModal = createAction<void>('movieSlice/openModal');
const closeModal = createAction<void>('movieSlice/closeModal')


const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getMovieInfo.fulfilled, (state, action) => {
                state.movieInfo = action.payload
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.movies = results;
                state.page = page;
                state.total_pages = total_pages;
            })
            .addCase(getNewPopular.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.newPopularMovies = results;
                state.page = page;
                state.total_pages = total_pages
            })
            .addCase(getTvShows.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.tvShows = results;
                state.page = page;
                state.total_pages = total_pages;
            })
            .addCase(getNowPlaying.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.nowPlaying = results;
                state.page = page;
                state.total_pages = total_pages
            })
            .addCase(getTrending.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.trending = results;
                state.page = page;
                state.total_pages = total_pages;
            })
            .addCase(getTopRatedMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.topRatedMovies = results;
                state.page = page;
                state.total_pages = total_pages
            })
            .addCase(getGenresList.fulfilled, (state, action) => {
                state.genresList = action.payload
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.moviesByGenre = results;
                state.genresPage = page;
                state.total_genrePage = total_pages
            })
            .addCase(getThrillerMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.thrillerMovies = results;
                state.genresPage = page;
                state.total_genrePage = total_pages;
            })
            .addCase(getComedyMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.comedyMovies = results;
                state.genresPage = page;
                state.total_genrePage = total_pages;
            })
            .addCase(getFamilyMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.familyMovies = results;
                state.genresPage = page;
                state.total_genrePage = total_pages;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                const {results, page, total_pages} = action.payload;
                state.searchMovies = results;
                state.page = page;
                state.total_pages = total_pages;
            })
            .addCase(openModal, (state, action) => {
                state.isModalOpen = true;
                state.modalMovie = null;
            })
            .addCase(closeModal, (state, action) => {
                state.isModalOpen = false;
                state.modalMovie = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false
            })

})

const {reducer: movieReducer, actions} = slice;

const movieActions = {
    ...actions,
    getMovies,
    getMovieInfo,
    getNewPopular,
    getTvShows,
    getNowPlaying,
    getTrending,
    getTopRatedMovies,
    getGenresList,
    getMoviesByGenre,
    getThrillerMovies,
    getComedyMovies,
    getFamilyMovies,
    searchMovies,
    openModal,
    closeModal

}

export {movieActions, movieReducer}
