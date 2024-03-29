import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import Timer from "../timer/Timer";

interface propsTable {
    data: Array<rowCellType>,
    onClickBid: (row: rowCellType) => void
}

export interface rowCellType {
    name: string,
    price: number,
    finishedDate: string
}

export default function DataTable(props: propsTable) {
    const _countdown = (finishedDate: string) => {
        const finDate = new Date(finishedDate)
        console.log(finDate.getTime())
        console.log(Date.now())
        const delay = (finDate.getTime() - Date.now()) / 1000;
        return <Timer delayResend={delay.toString()}/>
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Current Price</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell align="right">Bid</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.length > 0 && props.data.map((row: rowCellType) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{_countdown(row.finishedDate)}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" onClick={() => props.onClickBid(row)}>Bid</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
