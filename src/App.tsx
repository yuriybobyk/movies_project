import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";


function App() {
  return (
      <Routes>
            <Route path={'/'} element={<MainLayout/>}>

            </Route>
      </Routes>
  );
}

export default App;
