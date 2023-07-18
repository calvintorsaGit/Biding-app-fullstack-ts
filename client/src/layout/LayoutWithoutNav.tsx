import React from 'react';
import {Outlet} from 'react-router';
import NavBarWithoutLink from "../component/navigation/NavBarWithoutLink";

export default () => <>
    <NavBarWithoutLink/>
    <Outlet/>
</>
