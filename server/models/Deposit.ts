import mongoose from 'mongoose';

export interface IDeposit extends mongoose.Document {
    email: string,
    totalDeposit: number,
    createdAt: Date,
}

const DepositSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    totalDeposit: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Deposit = mongoose.model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
