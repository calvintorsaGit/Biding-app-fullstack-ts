import './Register.css'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, {useState} from "react";

import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";

export default function RegisterPage() {
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") || "";
        const password = data.get("password") || "";
        console.log(email, password);
        AuthService.register(email.toString(), password.toString()).then(() => {
                navigate('/');
            },
            error => {
                const resMessage = error.response.data.message;
                setErrorMessage(resMessage);
                setShowError(true);

            })
    };

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

    const _renderRegisterBox = () => (
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
                    Register
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
                        Register
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='warning'
                        href='/'
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    )

    return (<React.Fragment>
            {_renderRegisterBox()}
            {_renderErrorMessage()}
        </React.Fragment>
    );
}
