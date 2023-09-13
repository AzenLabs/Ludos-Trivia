import { Server } from "socket.io";
import {
  connectedUsers,
  userDataList,
  hostInfo,
  questionsReport,
  quizData,
  classScoreboard,
  classUsers,
  top4Classes,
  armouryChoices,
  bannedUsernames,
} from "../../data/data";
import {
  calculateAllScoreboard,
  calculateAllTeamScoreboard,
} from "../../components/scoreboard_functions";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
    pingInterval: 5000, // so user disconnects after 5seconds if browser force closed
    pingTimeout: 5000,
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("connection!");

    socket.on("is-host", (key) => {
      // auth host and save host socket id for auth
      console.log("Host tryna auth with key ", key);
      if (key === "supremeleader") {
        // very basic auth
        hostInfo.hostSocket = socket.id;
        socket.emit("auth-host", true);
        // io.to(hostInfo.hostSocket).emit("current-users", connectedUsers)  // tell them current users
      } else {
        socket.emit("auth-host", false);
        socket.disconnect(); // close conn if conn wrong
      }
    });

    socket.on("current-users", (obj) => {
      // host func
      if (socket.id == hostInfo.hostSocket) {
        console.log("Current connected users: ", connectedUsers);
        // io.to(hostInfo.hostSocket).emit("current-users", connectedUsers)
        io.to(hostInfo.hostSocket).emit("current-users", connectedUsers);
      }
    });

    socket.on("remove-user", (username) => {
      // host func
      if (socket.id == hostInfo.hostSocket) {
        for (const [key, value] of Object.entries(connectedUsers)) {
          if (value.username == username){
            delete connectedUsers[key];
          }
        }
        bannedUsernames.push(username)
        io.to(hostInfo.hostSocket).emit("current-users", connectedUsers);
      }
    });

    // new user joined
    socket.on("new-user", (obj) => {
      console.log("new user!");
      let currentEmeralds = 0;
      let currentBankEmeralds = 0;

      if(bannedUsernames.includes(obj.username)){
        socket.emit("user-kicked", null);   // username is banned
        return;
      }

      // check if user already has joined before
      if (obj.email in userDataList) {
        // user with email has joined before
        currentEmeralds = userDataList[obj.email].emeralds;
        currentBankEmeralds = userDataList[obj.email].bankEmeralds;
      } else {
        // complete new user, add to userdatalist
        let userData = obj; // extra user obj to hold emerald field
        userData["emeralds"] = 0; // init empty emeralds
        userData["bankEmeralds"] = 0;
        userDataList[obj.email] = userData;
      }

      // add to class list
      // classScoreboard[obj.class].students[obj.username] = userDataList[obj.email].emeralds;
      classUsers[obj.class] += [
        {
          // add to socket list
          username: obj.username,
          class: obj.class,
        },
      ];

      connectedUsers[socket.id] = {
        // add to socket list
        username: obj.username,
        class: obj.class,
        email: obj.email,
      };
      console.log("connected users: ", connectedUsers);
      console.log("user data list: ", userDataList);
      console.log("class users: ", classUsers);

      if (hostInfo.hostSocket !== "")
        io.to(hostInfo.hostSocket).emit("new-user", obj); // io to broadcast to host
      socket.emit("current-emeralds", currentEmeralds); // only emit to connected socket
      console.log("PHASE", hostInfo.phase);
      socket.emit("current-phase", hostInfo.phase);
    });

    socket.on("set-phase", (ind) => {
      // host func
      console.log("changing phase to ", ind);
      if (socket.id == hostInfo.hostSocket) {
        hostInfo.phase = ind;
        io.emit("current-phase", hostInfo.phase);
      }
    });

    socket.on("bruh", (obj) => {
      // for testing
    });

    socket.on("show-question", (obj) => {
      // host func
      if (socket.id == hostInfo.hostSocket) {
        io.emit("show-question", obj);
      }
    });
    socket.on("show-results", (obj) => {
      // host func
      if (socket.id == hostInfo.hostSocket) {
        io.emit("show-results", obj);
      }
    });

    socket.on("stud-answer", (obj) => {
      questionsReport[hostInfo.phase].push(obj);

      let email = connectedUsers[socket.id].email; // get stud's email to fetch data
      let result;
      if (
        quizData[hostInfo.phase]["qns"][obj["qns_num"] - 1]["correct"] ==
        obj["ans"]
      ) {
        // add emeralds to stud
        userDataList[email].emeralds += 50; // add flat value first to user emeralds

        result = {
          result: true,
          emeraldsAdded: 50,
          emeraldsNow: userDataList[email].emeralds,
        };
        // socket.emit("stud-result", result)
      } else {
        result = {
          result: false,
          emeraldsAdded: 0,
          emeraldsNow: userDataList[email].emeralds,
        };
        // socket.emit("stud-result", result)
      }
      // update student emerald in respective class data

      if (!classScoreboard[obj.class]) {
        classScoreboard[obj.class] = {
          students: {}, // Create the students object
        };
      }

      classScoreboard[obj.class].students[obj.username] = {
        emeralds: userDataList[email].emeralds,
        email: email,
      };

      result["scoreboard"] = classScoreboard[obj.class].students.emeralds;

      socket.emit("stud-result", result);

      io.to(hostInfo.hostSocket).emit("stud-answer", obj.ans);
    });

    socket.on("get-scoreboard", () => {
      // obj shld include class
      let final = calculateAllScoreboard(); // TODO: should i process this and only send related class scoreboard based on socket info to reduce network bandwidth?
      io.emit("get-scoreboard", final); // tell everyone to view scoreboard
    });

    socket.on("stud-class-donation", (obj) => {
      let email = connectedUsers[socket.id].email; // get stud's email to fetch data

      // add check to see if student has enough emeralds
      const userEmeralds = userDataList[email].emeralds;

      if (userEmeralds !== 0) {
        let email = connectedUsers[socket.id].email; // get stud's email to fetch data
        const userEmeralds = userDataList[email].emeralds;
        // Share 30% of their emeralds with their team (based on 30% for wants)
        const emeraldsToRemove = Math.ceil(userEmeralds * 0.3); // Calculate 30% of the user's emeralds

        // Donate to class
        classScoreboard[obj.class].store += emeraldsToRemove;
        socket.emit("current-team-emeralds", classScoreboard[obj.class].store);

        // Deduct from personal fund
        userDataList[email].emeralds -= emeraldsToRemove; // Subtract the calculated amount
        socket.emit("current-emeralds", userDataList[email].emeralds); // only emit to connected socket
        io.emit("stud-class-donation", "stud donated emeralds to class");
      } else {
        io.emit("stud-class-donation", "You have no emeralds!");
      }
    });

    socket.on("stud-personal-bank", (obj) => {
      let email = connectedUsers[socket.id].email; // get stud's email to fetch data
      const userEmeralds = userDataList[email].emeralds;
      if (userEmeralds !== 0) {
        // Save 20% of emeralds in the bank
        const emeraldsToRemove = Math.ceil(userEmeralds * 0.2); // Calculate 25% of the user's emeralds

        // Add to bank
        userDataList[email].bankEmeralds += emeraldsToRemove; // add flat value first to user emeralds
        socket.emit("current-bank-emeralds", userDataList[email].bankEmeralds); // only emit to connected socket

        // Deduct from personal fund
        userDataList[email].emeralds -= emeraldsToRemove; // Subtract the calculated amount
        // update student emerald in respective class data
        classScoreboard[obj.class].students[obj.username].emeralds =
          userDataList[email].emeralds;
        socket.emit("current-emeralds", userDataList[email].emeralds); // only emit to connected socket
      } else {
        io.emit("stud-personal-bank", "You have no emeralds!");
      }
    });

    socket.on("personal-bank-returns", (obj) => {
      if (obj.email) {
        let email = obj.email; // get stud's email to fetch data
        if (userDataList.hasOwnProperty(email)) {
          const bankEmeralds = userDataList[email].bankEmeralds;
          if (bankEmeralds !== 0) {
            const investedEmeralds = Math.ceil(bankEmeralds * 1.2); // 20% increase due to investment

            // Add to personal fund and remove from bank
            userDataList[email].bankEmeralds = 0; // Subtract the calculated amount
            userDataList[email].emeralds += investedEmeralds; // add flat value first to user emeralds
            socket.emit(
              "current-bank-emeralds",
              userDataList[email].bankEmeralds
            ); // only emit to connected socket

            // update student emerald in respective class data
            classScoreboard[obj.class].students[obj.username].emeralds =
              userDataList[email].emeralds;
            socket.emit("current-emeralds", userDataList[email].emeralds); // only emit to connected socket
          }
        } else {
          console.error(
            `userDataList does not contain an entry for email: ${email}`
          );
        }
      } else {
        console.error("obj.email is undefined or null");
      }
    });

    socket.on("submit-armoury-choice", (obj) => {
      const classEmeralds = classScoreboard[obj.user.class].store;

      if (classEmeralds >= obj.total) {
        let email = connectedUsers[socket.id].email; // get stud's email to fetch data

        Object.keys(classScoreboard).forEach((className) => {
          console.log("className", className);
          const studentObj = classScoreboard[className]["students"];
          console.log("classscoreboard[classnaem]");
          console.log(classScoreboard[className]);
          console.log("studentOBJ: ");
          console.log(studentObj);
          Object.keys(studentObj).forEach((studentName) => {
            console.log("inside next layer", studentName);

            if (studentObj[studentName]?.email === email) {
              console.log("submitting data");
              classScoreboard[className]["students"][studentName].armoury =
                obj.selectedItems;
              
              
            }
          });
        });

        console.log("inside submit armoury choice");
        console.log(classScoreboard);
        console.log(classScoreboard["3 Honour"]["students"]["julia"]);

        io.emit("submit-armoury-choice", "Done");
      } else {
        io.emit("submit-armoury-choice", "Not enough emeralds!");
      }
    });

    socket.on("put-top-classes", (obj) => {
      for (const className in obj) {
        if (obj.hasOwnProperty(className)) {
          const classData = obj[className];

          top4Classes[className] = {
            values: classData.values,
            store: classData.store,
            scoreboard: classData.scoreboard,
          };
        }
      }
    });

    socket.on("get-top-classes", (obj) => {
      io.emit("get-top-classes", top4Classes);
    });

    socket.on("disconnect", (obj) => {
      try {
        let data = connectedUsers[socket.id];
        let users = classUsers[data.class];
        users.forEach((user, ind) => {
          if (user.username == data.username) {
            delete classUsers[data.class][ind];
          }
        });
      } catch (err) {
        // console.log(err)
      }
      delete connectedUsers[socket.id]; // remove user based on id
      if (hostInfo.hostSocket)
        io.to(hostInfo.hostSocket).emit("current-users", connectedUsers);
    });
  });

  console.log("Setting up socket");
  res.end();
}
