import { connect } from "formik";
import { Server } from "socket.io";

let connectedUsers = {}

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path:'/api/socket',
    addTrailingSlash: false
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("connection!")
    socket.emit("current-users", connectedUsers)  // tell them current users


    socket.on("new-user", (obj) => {
      console.log("new user!")
      connectedUsers[socket.id] = obj
      console.log(connectedUsers)

      io.emit("new-user", obj);   // io to broadcast to all connected clients
    });

    socket.on("disconnect", (obj) => {
      delete connectedUsers[socket.id]  // remove user based on id
      io.emit("current-users", connectedUsers)  
    })

  });
  

  console.log("Setting up socket");
  res.end();
}