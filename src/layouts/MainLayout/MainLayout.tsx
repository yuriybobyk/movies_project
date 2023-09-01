import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../../components";

const MainLayout = () => {

    const location = useLocation();

    const routesWithoutHeader = ['/login'];

    const hideHeader = routesWithoutHeader.includes(location.pathname);


    return (
        <div className="relative h-[100vh]">
            {!hideHeader && <Header/>}
            <Outlet/>
        </div>
    );
};

export {MainLayout}
