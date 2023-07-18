import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

function NavBarWithoutLink() {

    return (<AppBar position="static">
        <Toolbar sx={{bgcolor: '#4B3A26'}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Bidding App
            </Typography>
        </Toolbar>
    </AppBar>)
}

export default NavBarWithoutLink;
