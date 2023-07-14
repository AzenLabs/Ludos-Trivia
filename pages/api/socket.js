import { Server } from "socket.io";
import { connectedUsers, userDataList, hostInfo, questionsReport, quizData } from '../../data/data'

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

    socket.on("is-host", (obj) => {
      hostInfo.hostSocket = socket.id;

      io.to(hostInfo.hostSocket).emit("current-users", connectedUsers)  // tell them current users

      // send list of quiz questions to use later
      // io.to(hostInfo.hostSocket).emit("quiz-questions", questionsList)
      // console.log("send quiz questions!", questionsList)
    })

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

      if(hostInfo.hostSocket !== "") io.to(hostInfo.hostSocket).emit("new-user", obj);   // io to broadcast to host
      socket.emit("current-emeralds", currentEmeralds)    // only emit to connected socket
      socket.emit("current-phase", hostInfo.phase)
    });

    socket.on("set-phase", (ind) => {   // TODO: add security for this (maybe pass a secret key?)
      console.log("changing phase to ", ind)
      hostInfo.phase = ind
      io.emit("current-phase", hostInfo.phase)
    })

    socket.on("bruh", (obj) => {    // for testing
      console.log("socket said bruh")
    })

    // socket.on("quiz-start", (obj) => {
    //   console.log("quiz start")
    //   io.emit("quiz-start", 0)
    // })
    socket.on("show-question", (obj) => {
      console.log("next question")
      io.emit("show-question", obj)
    })
    socket.on("show-results", (obj) => {
      console.log("showing results")
      io.emit("show-results", obj)
    })

    socket.on("stud-answer", (obj) => {
      console.log("student answer this ", obj)
      questionsReport[2].push(obj)
      console.log(questionsReport)

      if(quizData[2]['qns'][obj["qns_num"]]["correct"] == obj["ans"]){
        console.log("stud is correct")
        socket.emit("stud-result", true)
      }else{
        console.log("stud is wrong")
        socket.emit("stud-result", false)
      }
    })

    socket.on("disconnect", (obj) => {
      delete connectedUsers[socket.id]  // remove user based on id
      if(hostInfo.hostSocket) io.to(hostInfo.hostSocket).emit("current-users", connectedUsers)       
    })

  });
  

  console.log("Setting up socket");
  res.end();
}