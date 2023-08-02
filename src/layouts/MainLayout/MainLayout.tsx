import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../../components";

const MainLayout = () => {
    return (
        <div className="relative h-[140vh]">
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout}
