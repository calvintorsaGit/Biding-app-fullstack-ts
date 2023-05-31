import React, {useEffect} from "react";
import {Alert, Box, Button, Grid, Snackbar} from "@mui/material";

import './Home.css'
import DataTable, {rowCellType} from "../../component/table/Table";
import {socket} from "../../component/navigation/NavBar"
import FormDialog from "../../component/dialog/Dialog";
import CompletedDataTable from "../../component/table/CompletedTable";

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const [selectBid, setSelectBid] = React.useState<any>({});
    const [data, setData] = React.useState([]);
    const [dataCompleted, setCompletedData] = React.useState([]);
    const [flagTable, setFlagTable] = React.useState('ongoing');

    const [errorDesc, setErrorDesc] = React.useState('');
    const [showErrorSnackBar, setShowErrorSnackBar] = React.useState(false);
    const [showSuccessBid, setShowSuccessBid] = React.useState(false);

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowErrorSnackBar(false);
        setShowSuccessBid(false);
    };

    const onClickBid = (item: rowCellType) => {
        setOpen(true);
        setSelectBid(item);
    }

    const onBid = (price: number) => {
        const user: any = JSON.parse(localStorage.getItem("user") ?? '');
        if (price > selectBid.price && user.balance !== 0) {
            const itemBid = {name: selectBid.name, price, email: user.email};
            socket.emit("put_bid", itemBid);
            setOpen(false);
            setShowSuccessBid(true);
        } else if (user.balance === 0) {
            setErrorDesc('Balance is zero, please deposit money!')
            setShowErrorSnackBar(true);
        } else if (price < selectBid.price) {
            setErrorDesc('Bid price is below current price')
            setShowErrorSnackBar(true);
        }
    }

    const getData = (data: any) => {
        const ongoingData = data.filter((item: any) => new Date(item.finishedDate).getTime() - Date.now() > 0)
        const completedData = data.filter((item: any) => new Date(item.finishedDate).getTime() - Date.now() < 0)
        setData(ongoingData);
        setCompletedData(completedData);
    }
    const changeData = () => socket.emit("initial_data");

    useEffect(() => {
        socket.emit("initial_data");
        socket.on("get_data", getData);
        socket.on("change_data", changeData);
    }, []);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{mt: 20}}
        >
            <Box sx={{mb: 4}}>
                <Button variant="outlined" onClick={() => setFlagTable('ongoing')}>Ongoing</Button>
                <Button variant="outlined" sx={{ml: 4}}
                        onClick={() => setFlagTable('completed')}>Completed</Button>
            </Box>
            <Box sx={{minWidth: "80%"}}>
                {flagTable === 'ongoing' && <DataTable data={data} onClickBid={onClickBid}/>}
                {flagTable === 'completed' && <CompletedDataTable data={dataCompleted}/>}
            </Box>
            <FormDialog open={open} onBid={onBid} onClose={() => setOpen(false)}/>
            <Snackbar open={showErrorSnackBar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert severity="error" onClose={handleCloseSnackbar} sx={{fontSize: 20}}>
                    {errorDesc}
                </Alert>
            </Snackbar>
            <Snackbar open={showSuccessBid} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert severity="success" onClose={handleCloseSnackbar} sx={{fontSize: 20}}>
                    Success Place a Bid!
                </Alert>
            </Snackbar>
        </Grid>
    );
}
