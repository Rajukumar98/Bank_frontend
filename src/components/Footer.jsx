import React from "react";

import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root:{
        textAlign: "center",
    position: "relative",
    bottom: "0",
    width: "100% !important",
    height: "40px ",
    background: theme.palette.info.main,
    border: 0,
    borderRadius: 3,
    color:"white"
    }
}));

function Footer() {
    const classes = useStyles();
    return (
        <Box className={classes.root} >
            <Grid container justify="center" alignItems="center">
                <Grid container item sm={4} justify="center">
                    <Typography variant="title" align="center">Copyright © 2021 The Sparks Foundation Bank</Typography>
                </Grid>
                <Grid item container sm={8} justify="space-evenly" spacing={2}>
                    <Grid item>
                        <Typography variant="title" align="center">Disclaimer</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="title" align="center">Privacy Policy</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="title" align="center">Code of Commitment</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="title" align="center">Respinsible Disclosure Policy</Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
}

export default Footer;