import React from 'react';
import ResponsiveAppBar from "../component/navigation/NavBar";
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
        </>
    );
};
