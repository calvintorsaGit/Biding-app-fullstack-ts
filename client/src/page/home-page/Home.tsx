import React, {useEffect} from "react";
import {Box, Button, Grid} from "@mui/material";
import './Home.css'
import DataTable from "../../component/table/Table";
import {socket} from "../../component/navigation/NavBar"

export default function Home() {
    const getData = (msg: any) => {
        console.log(msg)
    }
    useEffect(() => {
        socket.emit("initial_data");
        socket.on("get_data", getData);
    }, []);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{minHeight: '100vh', mt: 20}}
        >
            <Box sx={{mb: 4}}>
                <Button variant="outlined">Ongoing</Button>
                <Button variant="outlined" sx={{ml: 4}}>Completed</Button>
            </Box>
            <Box sx={{minWidth: "80%"}}>
                <DataTable/>
            </Box>
        </Grid>
    );
}
