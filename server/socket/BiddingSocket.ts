import ItemBid from "../models/ItemBid";

export const BiddingSocket = (io, socket) => {
    socket.on("initial_data", () => {
        ItemBid.find({}).then(docs => {
            io.sockets.emit("get_data", docs);
        });
    });

    socket.on("putBid", order => {
        ItemBid
            .update({ _id: order._id }, { $inc: { ordQty: order.order } })
            .then(updatedDoc => {
                // Emitting event to update the Kitchen opened across the devices with the realtime order values
                io.sockets.emit("change_data");
            });
    });
}

