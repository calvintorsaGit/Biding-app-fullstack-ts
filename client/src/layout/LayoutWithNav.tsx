import React from 'react';
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../component/navigation/NavBar";
import {Outlet} from 'react-router';

export default () => {
    if (localStorage.getItem("user") === null) {
        return <Navigate to="/" replace/>;
    }
    return (
        <>
            <ResponsiveAppBar/>
            <Outlet/>
        </>
    );
};
