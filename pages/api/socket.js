import { Server } from "socket.io";
import { connectedUsers, userDataList, currentPhase } from '../../data/data'

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path:'/api/socket',
    addTrailingSlash: false,
    pingInterval: 5000,   // so user disconnects after 10seconds if browser force closed
    pingTimeout: 5000
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("connection!")
    socket.emit("current-users", connectedUsers)  // tell them current users

    // new user joined
    socket.on("new-user", (obj) => {
      console.log("new user!")
      let currentEmeralds = 0

      // check if user already has joined before
      if(obj.email in userDataList){    // user with email has joined before
        currentEmeralds = userDataList[obj.email].emeralds
      }else{    // complete new user, add to userdatalist
        let userData = obj          // extra user obj to hold emerald field
        userData['emeralds'] = 0   // init empty emeralds
        userDataList[obj.email] = userData
      }

      
      connectedUsers[socket.id] = {   // add to socket list
        "username": obj.username,
        "class": obj.class
      }
      console.log(connectedUsers)
      console.log(userDataList)

      io.emit("new-user", obj);   // io to broadcast to all connected clients
      socket.emit("current-emeralds", currentEmeralds)    // only emit to connected socket
      socket.emit("current-phase", currentPhase.phase)
    });

    socket.on("set-phase", (ind) => {   // TODO: add security for this (maybe pass a secret key?)
      console.log("changing phase to ", ind)
      currentPhase.phase = ind
      io.emit("current-phase", currentPhase.phase)
    })

    socket.on("disconnect", (obj) => {
      delete connectedUsers[socket.id]  // remove user based on id
      io.emit("current-users", connectedUsers)       
    })

  });
  

  console.log("Setting up socket");
  res.end();
}