import mongoose from 'mongoose';

export interface IItemBid extends mongoose.Document {
    name: string,
    price: number,
    createdAt: Date,
}

const ItemBidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    finishedDate: {
        type: Date,
        required: true
    },
    lastBidder: {
        type: String
    },
}, {
    timestamps: true,
    collection: 'bids'
});

const ItemBid = mongoose.model<IItemBid>("ItemBid", ItemBidSchema);

export default ItemBid;
