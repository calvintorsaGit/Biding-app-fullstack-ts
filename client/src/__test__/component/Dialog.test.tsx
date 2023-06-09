import React from 'react';
import {handleBid, handleClose} from '../../component/dialog/Dialog';

const props = {
    open: true,
    onClose: jest.fn(),
    onBid: jest.fn()
};

describe('Dialog Component', () => {
    it('handle bid should call correct props', () => {
        const priceRef = {
            current: {
                value: 100
            }
        }
        handleBid(props, priceRef)
        expect(props.onBid).toBeCalledWith(priceRef.current.value)
    });

    it('handle close should call correct props', () => {

        handleClose(props);
        expect(props.onClose).toBeCalled()
    });
});
