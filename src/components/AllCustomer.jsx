import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Box, Grid } from '@material-ui/core';
import BackImage from "../back.jpg"
import {
    Link,
} from "react-router-dom";

const columns = [
    { id: 'accountNo', label: 'Account Number', minWidth: 120, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 130, align: 'center' },
    {
        id: 'email',
        label: 'Email',
        minWidth: 150,
        align: 'center',
    },

    {
        id: 'mobile',
        label: 'Mobile',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'balance',
        label: 'Balance',
        minWidth: 100,
        align: 'center',
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "75vh",
    },
    butt:{
        backgroundColor: theme.palette.success.main
    }
}));

export default function AllCustomer(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = props.BankData;
    

    return (
        <Box width="100%" bgcolor="yellow" style={{
            backgroundImage: `url(${BackImage})`,
            backgroundSize: "cover",
            height: "86.1vh",
            color: "#f5f5f5"
        }} >
            <Grid container>
                <Grid item sm={2} xs={0}></Grid>
                <Grid item sm={8} xs={12}>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.accountNo}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell align="center">
                                                    <Button variant="contained" className={classes.butt} onClick={(e) => {
                                                        console.log("Button Clicked", row.accountNo)
                                                        props.changeAccount(row.accountNo)
                                                    }}>
                                                        <Link to="/customer" style={{ "textDecoration": "none", "color": "white" }}>
                                                            View Details
                                            </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={2} xs={0}></Grid>
            </Grid>
        </Box>

    );
}
