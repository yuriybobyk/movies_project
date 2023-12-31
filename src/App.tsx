import { Route, Routes} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AccountPage, HomePage, MoviesPage, NewPopularPage, TvShowsPage } from "./pages";
import { MoviesByGenre } from "./components";
import { LoginPage } from "./pages";
import Animation from "./components/Animation";
import {useState} from "react";
import SearchResult from "./components/SearchResult";

function App() {
    const [animationVisible, setAnimationVisible] = useState(true);

    const handleAnimationComplete = () => {
        setAnimationVisible(false);
    };

    return (
        <div>
            {animationVisible && (
                <Animation onAnimationComplete={handleAnimationComplete} />
            )}

            {!animationVisible && (
                <Routes>
                    <Route path={"/"} element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path={"/movies"} element={<MoviesPage />} />
                        <Route path={"/new&popular"} element={<NewPopularPage />} />
                        <Route path={"/tvshows"} element={<TvShowsPage />} />
                        <Route
                            path={"/movies/by-genre"}
                            element={<MoviesByGenre />}
                        />
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path="/search/:query" element={<SearchResult/>}/>
                        <Route path="/account" element={<AccountPage/>}/>
                    </Route>
                </Routes>
            )}
        </div>
    );
}

export default App;
