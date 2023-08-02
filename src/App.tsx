import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./Pages";


function App() {
  return (
      <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
            </Route>
      </Routes>
  );
}

export default App;
