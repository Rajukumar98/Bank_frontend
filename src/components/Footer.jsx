import React from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// const FooterContainer = styled.div`
//   text-align: center;
//   position: absolute;
//   bottom: 0;
//   width: 100% !important;
//   height: 100px !important ;
//   background: #6cf;
// `;
const useStyles = makeStyles({
    root: {
        textAlign: "center",
        position: "relative",
        bottom: "0",
        width: "100% !important",
        height: "100px !important ",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
});

function Footer() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography variant="title">Footer Text</Typography>
        </Box>
    );
}

export default Footer;