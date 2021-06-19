import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from "./logo.png"
import {
  Link,
} from "react-router-dom";
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid container >
            <Grid container item sm={4} xs={0} justify="flex-start" >
              <Grid item>
                <Button color="inherit">
                  <Link to="/" style={{ "textDecoration": "none", "color": "white" }}>Home</Link>
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={4} direction="row" spacing={2}>
              <Grid item>
              <img src={logo} alt="icon" height="35px"></img>
              </Grid>
              <Grid item>
              <Typography variant="h5" className={classes.title}>
                The Sparks Foundation Bank
              </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={0} sm={4} justify="flex-end">
              <Grid item>
                <Button color="inherit">
                  <Link to="/Customers" style={{ "textDecoration": "none", "color": "white" }}>Customers</Link>
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
