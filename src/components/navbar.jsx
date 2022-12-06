import { AppBar, Toolbar } from "@mui/material";
import { signOut } from "next-auth/react";

import { Button, Box, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Visual Schedule
                </Typography>
                <Box>
                    <Button color='inherit' onClick={() => signOut()}> <LogoutIcon/> &nbsp; Log Out</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;