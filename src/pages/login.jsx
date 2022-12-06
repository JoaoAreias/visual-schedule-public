import React from "react";
import { useState } from "react";
import { signIn, getSession, getProviders } from "next-auth/react";

import Fab from '@mui/material/Fab';
import { Alert, Grid } from '@mui/material';
import { Card, CardContent, CircularProgress } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


function Login(props) {
    const { providers } = props;
    const [error, setError] = useState(false);

    function loginHandler(provider) {
        try{
            signIn(provider.id);
        } catch (error) {
            setError(true);
        }
    }
    
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <Grid item xs={3}>
            <Card sx={{ minWidth: "275px", maxWidth: "400px", width: "100vh"}}>
                <Alert severity="error" sx={{ display: error ? "block" : "none"}}>Login failed</Alert>
                <CardContent sx={{textAlign: "center"}}>
                <h1>Sign In</h1>
                <hr />
                <Fab variant="extended" color="primary" aria-label="sign-in" onClick={() => loginHandler(providers.google) }>
                    <FontAwesomeIcon icon={faGoogle} />
                </Fab>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
    );    
}

export default Login;


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if(session) {
        return {
            redirect: {
                destination: '/app',
            },
        }
    }

    return {
        props: { 
            providers: await getProviders(),
        }
    }
}