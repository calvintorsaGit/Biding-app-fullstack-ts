import React from "react";
import {Alert, Box, Button, Grid, Snackbar, TextField} from "@mui/material";
import './CreateItem.css'
import DepositService from "../../services/DepositService";

export default function CreateItem() {
    const [showSnackbarSuccess, setShowSnackbarSuccess] = React.useState(false);

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbarSuccess(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name") || "";
        const startPrice = data.get("start-price") || 0;
        const timeWindow = data.get("time-window") || 0;
        DepositService.createItem(name.toString(), Number(startPrice), Number(timeWindow)).then(
            () => {
                setShowSnackbarSuccess(true);
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                minWidth: "75%",
                display: "flex", flexDirection: "column"
            }}>
                <TextField id="name" name="name" label="Name" variant="outlined" sx={{my: 2}}/>
                <TextField id="start-price" name="start-price" type="number" label="Start Price" variant="outlined"
                           sx={{my: 2}}/>
                <TextField id="time-window" name="time-window" type="number" label="Time Window in Minutes" variant="outlined"
                           sx={{my: 2}}/>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, width: 120, alignSelf: "center"}}
                >
                    Submit
                </Button>
            </Box>
            <Snackbar open={showSnackbarSuccess} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert severity="success" onClose={handleCloseSnackbar} sx={{fontSize: 20}}>
                    Success Add Item!
                </Alert>
            </Snackbar>
        </Grid>
    );
}
