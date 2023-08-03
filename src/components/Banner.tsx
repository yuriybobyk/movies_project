import React from 'react';
import {useAppSelector} from "../hooks";

const Banner = () => {

    const {movieInfo} = useAppSelector(state => state.movieReducer)
    console.log(movieInfo.id)
    return (
        <div>

        </div>
    );
};

export {Banner}
