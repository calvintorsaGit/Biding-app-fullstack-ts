import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import Deposit from '../models/Deposit';
import ItemBid from '../models/ItemBid';
import User from "../models/User";

// @Desc Deposit
// @Route /deposit
// @Method POST
export const deposit = asyncHandler(async (req: Request, res: Response) => {

    const {email, totalDeposit} = req.body;

    const deposit = new Deposit({
        email, totalDeposit
    });

    await deposit.save();
    const updatedUser = await User.findOneAndUpdate(
        {email: email},
        {$inc: {balance: totalDeposit}}, {returnDocument: 'after'}
    )

    // await User
    // .updateOne({ email: email }, { inc: { balance: totalDeposit } })

    res.status(201).json({
        success: true, user: updatedUser
    });

})

// @Desc Deposit
// @Route /deposit
// @Method POST
export const createItem = asyncHandler(async (req: Request, res: Response) => {

    const {name, startPrice, timeWindow} = req.body;
    const currentDate = new Date(Date.now() + (timeWindow * 60 * 1000));
    const itemBid = new ItemBid({
        name, price: startPrice, finishedDate: currentDate
    });

    await itemBid.save();

    res.status(201).json({
        success: true, deposit: {
            name,
            startPrice,
            currentDate
        }
    });

})

