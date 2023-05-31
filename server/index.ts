import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import {notFound, errorHandler} from './middlewares/ErrorMiddleware';
import UserRoutes from './routes/UserRoutes';
import TransactionRoutes from './routes/TransactionRoutes';
import {BiddingSocket} from "./socket/BiddingSocket";
import ItemBid from "./models/ItemBid";

const cors = require('cors');
const app: Application = express();
const socketIO = require("socket.io");
const http = require("http");

dotenv.config();

connectDB();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

// Default
app.get("/api", (req: Request, res: Response) => {
    res.status(201).json({message: "Welcome to Auth ts"});
})

// User Route
app.use("/api/auth", UserRoutes);

app.use("/api", TransactionRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});
io.on("connection", socket => {
    socket.on("initial_data", () => {
        ItemBid.find({}).then(docs => {
            io.sockets.emit("get_data", docs);
        });
    });

    socket.on("put_bid", itemBid => {
        ItemBid
            .updateOne({name: itemBid.name}, {$set: {price: itemBid.price, lastBidder: itemBid.email}})
            .then(updatedDoc => {
                io.sockets.emit("change_data", updatedDoc);
            });
    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
