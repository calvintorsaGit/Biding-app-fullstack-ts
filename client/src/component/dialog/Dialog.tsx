import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MutableRefObject, useEffect, useRef} from "react";

interface dialogProps {
    open: boolean,
    onClose: () => void,
    onBid: (price: number) => void
}

export default function FormDialog(props: dialogProps) {
    const [open, setOpen] = React.useState(false);
    const priceRef: any = useRef();

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleBid = () => {
        const price = priceRef.current.value;
        props.onBid(price);
    };

    const handleClose = () => {
        props.onClose()
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bid Item Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bid Price
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        inputRef={priceRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBid}>Bid</Button>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
