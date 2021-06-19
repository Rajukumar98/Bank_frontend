import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import BackImage from "../195..jpg"
import axios from "axios";
import Draggable from 'react-draggable';
// import {
//     Link
// } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 220
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

function Customer(props) {
    const classes = useStyles();
    const maxWidth = 'sm'
    const fullWidth = true
    const [open, setOpen] = useState(false);
    const [Amount, setAmount] = useState(true);
    const [toAccount, setToAccount] = useState('sm');
    const [currAccount, setCurrAccount] = useState(props.account);
    // console.log(currAccount, "new Data")
    useEffect(() => {
        setTimeout(() => {
            fetchd()
        }, 1000)

    }, [open])
    const fetchd = () => {
        axios.post('http://localhost:5000/custom', currAccount).then((res) => {
            // console.log(res.data, "Data Fetched");
            setCurrAccount(res.data)
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchd()

    };
    const handleTransfer = () => {
        const valid = currAccount.balance >= Amount
        console.log("currAccount.balance", currAccount.balance >= Amount)
        if (!valid) {
            console.log("Not Valid , from: ", currAccount, " to: ", toAccount, " Amount: ", Amount)
            alert("Sorry, This Account has Insufficient Balance ")
        } else {
            console.log(" Valid , from: ", currAccount, " to: ", toAccount, " Amount: ", Amount)
            props.transfer(currAccount, toAccount, Amount)
            // setFromAccount(currAccount.balance-Amount)
            setOpen(false);
            handleConfirmClickOpen(true)
        }
    }

    const handleMaxWidthChange = (event) => {
        setToAccount(event.target.value)
    };


    const allAccount = props.AllData.filter((acc) => {
        return acc.accountNo !== currAccount.accountNo
    })

    const [cOpen, setCOpen] = React.useState(false);

    const handleConfirmClickOpen = () => {
        setCOpen(true);
    };

    const handleConfirmClose = () => {
        setCOpen(false);
    };


    return (
        <Box
            width="100%"
            bgcolor="yellow"
            style={{
                backgroundImage: `url(${BackImage})`,
                backgroundSize: "cover",
                height: "86.1vh",
                color: "#f5f5f5"
            }}>
            <Grid container>
                <Grid item sm={4} xs={2}></Grid>
                <Grid item sm={4} xs={8}>
                    <Box mt="10vh">
                        <Grid container justify="center">
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Customer Name: {currAccount.name}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Account Number: {currAccount.accountNo}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Email:  {currAccount.email}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Account Balance:  {currAccount.balance}
                                    </Typography>
                                </CardContent>
                                <Grid container justify="center" alignItems="center" >
                                    <Grid item>
                                        <Button variant="contained" size="small" onClick={handleClickOpen}>Transfer Money</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Box>
                    <Dialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <DialogTitle id="max-width-dialog-title">Transfer Money</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                The Money will be transferred from this account to Another Account
                    </DialogContentText>
                            <form className={classes.form} noValidate>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="account">To Account</InputLabel>
                                    <Select
                                        autoFocus
                                        value={toAccount}
                                        onChange={handleMaxWidthChange}
                                        inputProps={{
                                            name: 'Account',
                                            id: 'account',
                                        }}

                                    >
                                        {allAccount.map((acc) => {
                                            return <MenuItem key={acc.accountNo} value={acc}>{acc.name}--{acc.accountNo}</MenuItem>
                                        })}
                                    </Select>

                                    <TextField
                                        id="standard-number"
                                        label="Amount"
                                        type="number"
                                        min="1" max="10000"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: 10000, min: 1
                                            }
                                        }}
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                        }}
                                    />
                                </FormControl>

                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleTransfer} color="primary">
                                {/* <Link to="/customer" style={{ "textDecoration": "none", "color": "black" }}> */}
                                Transfer
                            {/* </Link> */}

                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={cOpen}
                        onClose={handleConfirmClose}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Subscribe
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Transaction Successful
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleConfirmClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid item sm={4} xs={2}></Grid>
            </Grid>

        </Box>
    )
}

export default Customer