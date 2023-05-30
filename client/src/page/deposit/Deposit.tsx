import React from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import './Deposit.css'
import DepositService from "../../services/DepositService";

export default function Deposit() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('halo')
        const data = new FormData(event.currentTarget);
        const amount = data.get("amount") || 0;
        DepositService.deposit("testes@gmail.com",Number(amount)).then(
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
            justifyContent="center"
            sx={{minHeight: '100vh'}}
        >
            <h1 className="h1">Deposit</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate
                 sx={{minWidth: "80%", display: "flex", flexDirection: "column"}}>
                <TextField id="amount" name="amount" label="Amount" variant="outlined" sx={{my: 2}}/>
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
