import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {RefObject, useEffect, useRef} from "react";

interface dialogProps {
    open: boolean,
    onClose: () => void,
    onBid: (price: number) => void
}

export const handleBid = (props: dialogProps, priceRef: RefObject<any> ) => {
    const price = priceRef.current.value;
    props.onBid(price);
};

export const handleClose = (props: dialogProps) => {
    props.onClose()
};

export default function FormDialog(props: dialogProps) {
    const [open, setOpen] = React.useState(false);
    const priceRef: RefObject<any> = useRef();

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return (
        <div>
            <Dialog open={open} onClose={() => handleClose(props)}>
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
                    <Button onClick={() => handleBid(props, priceRef)}>Bid</Button>
                    <Button onClick={() =>handleClose(props)} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
