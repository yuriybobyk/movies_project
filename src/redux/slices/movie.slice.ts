import {IMovie} from "../../interfaces/movie.interface";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services";
import {AxiosError} from "axios";
import {IMovieData} from "../../interfaces/movie.data";

interface IState {
    movies: IMovie[];
    page: number;
    total_pages: number;
    moviesByGenre: IMovie[];
    movieInfo: IMovie;

}

const initialState: IState = {
    movies: [],
    page: null,
    total_pages: null,
    moviesByGenre: [],
    movieInfo: null,
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
    'movieSlice',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovies(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

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
})

const {reducer: movieReducer, actions} = slice;

const movieActions = {
    ...actions,
    getMovies,
    getMovieInfo
}

export {movieActions, movieReducer}
