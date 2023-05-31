import React from "react";
import {Alert, Box, Button, Grid, Snackbar, TextField} from "@mui/material";
import './Deposit.css'
import DepositService from "../../services/DepositService";

export default function Deposit() {
    const [showSnackbarSuccess, setShowSnackbarSuccess] = React.useState(false);

    const handleCloseSnacbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbarSuccess(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const user: any = JSON.parse(localStorage.getItem("user") ?? '')
        console.log(user)
        const data = new FormData(event.currentTarget);
        const amount = data.get("amount") || 0;
        DepositService.deposit(user.email, Number(amount)).then(
            (response) => {
                console.log(response.data)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                window.dispatchEvent(new Event("storage"));
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
            justifyContent="center"
            sx={{minHeight: '100vh'}}
        >
            <Snackbar open={showSnackbarSuccess} autoHideDuration={1000} onClose={handleCloseSnacbar}>
                <Alert severity="success" sx={{width: '100%'}} onClose={handleCloseSnacbar}>
                    Success !
                </Alert>
            </Snackbar>
            <h1 className="h1">Deposit</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate
                 sx={{minWidth: "80%", display: "flex", flexDirection: "column"}}>
                <TextField id="amount" type="number" name="amount" label="Amount" variant="outlined" sx={{my: 2}}/>
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
