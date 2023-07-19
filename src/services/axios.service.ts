import axios from "axios";
import {baseMovieURL} from "../constants";

const axiosService = axios.create({baseURL: baseMovieURL});

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODJlN2Q1M2M3MTQ3OTFmZjczZmU4NzA3ODdmMDgxNSIsInN1YiI6IjU3ZWE0NjY0OTI1MTQxMTA4OTAwOGZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lEEivZliSc_G_UGJbP8p1LRlPXWu3U9erTCsUnRWP_U';

axiosService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer${token}`
    return config
})

export {axiosService}
