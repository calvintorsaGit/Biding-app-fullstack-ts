import './Login.css'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

import AuthService from "../../services/AuthService";
import {Alert, Snackbar} from "@mui/material";

export default function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") || "";
        const password = data.get("password") || "";

        AuthService.login(email.toString(), password.toString()).then(
            () => {
                navigate('/home');
            },
            error => {
                const resMessage = error.response.data.message;
                setErrorMessage(resMessage);
                setShowError(true);
            }
        );
    };

    const handleClose = () => setShowError(false);

    const _renderErrorMessage = () => (
        <Snackbar
            open={showError}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    )

    const _renderLoginBox = () => (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h2" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )

    return (
        <React.Fragment>
            {_renderLoginBox()}
            {_renderErrorMessage()}
        </React.Fragment>
    );
}
