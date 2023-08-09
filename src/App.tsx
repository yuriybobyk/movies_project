import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage, MoviesPage, NewPopularPage, TvShowsPage} from "./Pages";


function App() {
  return (
      <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/movies'} element={<MoviesPage/>}/>
                <Route path={'/new&popular'} element={<NewPopularPage/>}/>
                <Route path={'/tvshows'} element={<TvShowsPage/>}/>
            </Route>
      </Routes>
  );
}

export default App;
