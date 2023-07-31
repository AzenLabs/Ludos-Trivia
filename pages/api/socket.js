import { Server } from "socket.io";
import { connectedUsers, userDataList, hostInfo, questionsReport, quizData, classScoreboard } from '../../data/data'
import { connect } from "formik";
import { calculateAllScoreboard, calculateClassScoreboard } from "../../components/scoreboard_functions";

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
        "class": obj.class,
        "email": obj.email
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

      let email = connectedUsers[socket.id].email   // get stud's email to fetch data
      let result;

      if(quizData[2]['qns'][obj["qns_num"]]["correct"] == obj["ans"]){
        console.log("stud is correct")
        // add emeralds to stud
        userDataList[email].emeralds += 200   // add flat value first to user emeralds


        result = {
          "result": true,
          "emeraldsAdded": 200,
          "emeraldsNow": userDataList[email].emeralds
        }
        // socket.emit("stud-result", result)
      }else{
        console.log("stud is wrong")
        result = {
          "result": false,
          "emeraldsAdded": 0,
          "emeraldsNow": userDataList[email].emeralds
        }
        // socket.emit("stud-result", result)
      }
      // update student emerald in respective class data
      classScoreboard[obj.class].students[obj.username] = userDataList[email].emeralds
      console.log(classScoreboard)

      result['scoreboard'] = classScoreboard[obj.class].students

      socket.emit("stud-result", result)

      io.to(hostInfo.hostSocket).emit("stud-answer", obj.ans)
    })

    socket.on("get-scoreboard", () => {    // obj shld include class
      // let scoreboard = calculateClassScoreboard(classname)
      // console.log(scoreboard)

      // let data = {
      //   "scoreboard": scoreboard,
      //   "values": classScoreboard[classname].students
      // }
      console.log("getting scoreboard..")
      let final = calculateAllScoreboard()    // TODO: should i process this and only send related class scoreboard based on socket info to reduce network bandwidth?
      io.emit("get-scoreboard", final)   // tell everyone to view scoreboard
    })

    socket.on("disconnect", (obj) => {
      delete connectedUsers[socket.id]  // remove user based on id
      if(hostInfo.hostSocket) io.to(hostInfo.hostSocket).emit("current-users", connectedUsers)       
    })

  });
  

  console.log("Setting up socket");
  res.end();
}