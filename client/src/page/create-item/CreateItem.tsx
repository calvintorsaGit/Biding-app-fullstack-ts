import React from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import './CreateItem.css'
import DepositService from "../../services/DepositService";

export default function CreateItem() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('halo')
        const data = new FormData(event.currentTarget);
        const name = data.get("name") || "";
        const startPrice = data.get("start-price") || 0;
        const timeWindow = data.get("time-window") || 0;
        DepositService.createItem(name.toString(), Number(startPrice), Number(timeWindow)).then(
            () => {

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);

            }
        );
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{mt: 24}}
        >
            <h1 className="h1">Create Item</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{minWidth: "75%"}}>
                <TextField id="name" name="name" label="Name" variant="outlined" sx={{my: 2}}/>
                <TextField id="start-price" name="start-price" label="Start Price" variant="outlined" sx={{my: 2}}/>
                <TextField id="time-window" name="time-window" label="Time Window" variant="outlined" sx={{my: 2}}/>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, width: 120, alignSelf: "center"}}
                >
                    Submit
                </Button>
            </Box>
        </Grid>
    );
}
