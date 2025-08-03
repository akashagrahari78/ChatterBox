const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const connectDb = require("./config/mongodb.js");
const userRouter = require("./routes/userRoute.js");
const chatRouter = require("./routes/chatRoute.js")
const socketHandler = require('./socket/socketHandler');
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

connectDb().catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/user", userRouter);
app.use("/api/chats", chatRouter);

//socket.io connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socketHandler(io, socket);  
});

// app.get("/", (req, res)=>{
//     res.send("you are in home page")
// })

server.listen(3000, () => {
  console.log(`server running in port ${PORT}`);
});
