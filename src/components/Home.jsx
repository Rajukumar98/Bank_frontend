import React, { useState } from "react"
import BackImage from "../startback.jpg"
import MuiAlert from '@material-ui/lab/Alert';
import {
    Box,
    Grid,
    Button,
    // Card,
    // CardContent,
    // Typography,
    Snackbar,
    Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, TextField, MenuItem, Select
} from "@material-ui/core"
import {
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Home(props) {
    const classes = useStyles();
    const maxWidth = 'sm'
    const fullWidth = true
    const [open, setOpen] = React.useState(false);
    const [Amount, setAmount] = React.useState(true);
    const [toAccount, setToAccount] = React.useState('sm');
    const [fromAccount, setFromAccount] = React.useState('sm');
    const [allFromAccount, setAllFromAccount] = useState([])
    const allAccount = props.AllData
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleTransfer = () => {
        const valid = fromAccount.balance >= Amount
        console.log("fromAccount.balance", fromAccount.balance >= Amount)
        if (!valid) {
            console.log("Not Valid , from: ", fromAccount, " to: ", toAccount, " Amount: ", Amount)
            alert("Sorry, This Account has Insufficient Balance ")
        } else {
            console.log(" Valid , from: ", fromAccount, " to: ", toAccount, " Amount: ", Amount)
            props.transfer(fromAccount, toAccount, Amount)
            handleSnackClick()
            setOpen(false);
        }
    }

    const handleSetToAccount = (event) => {
        setToAccount(event.target.value)
    };
    const handleSetFromAccount = (event) => {
        const accountf = event.target.value
        setFromAccount(accountf)
        const aalAccount = allAccount.filter((acc) => {
            return acc.accountNo !== accountf.accountNo
        })
        console.log(aalAccount)
        setAllFromAccount(aalAccount)
    };

    const [openSnack, setOpenSnack] = React.useState(false);

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

    return (
        <>
            <Box width="100%" bgcolor="yellow" style={{
                backgroundImage: `url(${BackImage})`,
                backgroundSize: "cover",
                height: "86.1vh",
                color: "#f5f5f5"
            }} >
                <Grid
                    container
                    justify="center"
                >
                    <Grid item sm={2} xs={3}></Grid>
                    <Grid item sm={3} xs={7} >
                        <Box mt={30}>
                            <Grid container direction="column" spacing={8}>
                                <Grid item>
                                    <Button variant="contained" size="large" >
                                        <Link to="/Customers" style={{ "textDecoration": "none", "color": "black" }}> View All Customers</Link>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" size="large" onClick={handleClickOpen} >
                                        Make Transaction
                                </Button>
                                </Grid>
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

                                        <InputLabel htmlFor="fromAccount">From Account</InputLabel>
                                        <Select
                                            autoFocus
                                            value={fromAccount}
                                            onChange={handleSetFromAccount}
                                            inputProps={{
                                                name: 'fromAccount',
                                                id: 'fromAccount',
                                            }}
                                        >
                                            {allAccount.map((acc) => {
                                                return <MenuItem key={acc.accountNo} value={acc}>{acc.name}--{acc.accountNo}--{acc.balance}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>

                                        <InputLabel htmlFor="ToAccount">To Account</InputLabel>
                                        <Select
                                            autoFocus
                                            value={toAccount}
                                            onChange={handleSetToAccount}
                                            inputProps={{
                                                name: 'ToAccount',
                                                id: 'ToAccount',
                                            }}
                                        >
                                            {allFromAccount.map((acc) => {
                                                return <MenuItem key={acc.accountNo} value={acc}>{acc.name}--{acc.accountNo}--{acc.balance}</MenuItem>
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
                                    Transfer
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>
                    <Grid item sm={7} xs={2}></Grid>
                </Grid>
            </Box>
            <Snackbar
                open={openSnack}
                onClose={handleSnackClose}
                message="Transaction Successful"
                autoHideDuration={6000}
                anchorOrigin={ {vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity="success">
                    Transaction Successful
                </Alert>
            </Snackbar>
        </>
    )
}

export default Home