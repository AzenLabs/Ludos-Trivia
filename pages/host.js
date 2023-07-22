import { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Quiz from "../components/quiz";
import { MainContext } from "../context/MainContext";
import styles from "../styles/slideLayout.module.css";

let socket;

export default function Host() {
  let toast = useToast();
  const [lobbyUsers, setLobbyUsers] = useState([]);
  // const [ currentPhase, setCurrentPhase ] = useState(0) // controls the current phase

  // const [ qnsList, setQnsList ] = useState()    // store list of all quiz questions
  let { currentPhase, setCurrentPhase, setSock } = useContext(MainContext);

  let phaseList = {
    0: (
      <>
        <Heading textAlign={"center"} my="4">
          {lobbyUsers.length} Users Total
        </Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={6} m={5}>
          {lobbyUsers.length > 0 &&
            lobbyUsers.map((user, index) => (
              <GridItem
                key={index}
                bg={"blue.500"}
                p={5}
                borderRadius={30}
                textColor={"white"}
              >
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name={user.username}
                    bg={"white"}
                    textColor={"black"}
                  />

                  <Box>
                    <Heading size="sm">{user.username}</Heading>
                    <Text>{user.class}</Text>
                  </Box>
                </Flex>
              </GridItem>
            ))}
        </Grid>
        <Stack direction={"row"} position={"fixed"} bottom={5} w={"100%"}>
          <Button
            mx="auto"
            colorScheme="red"
            onClick={() => {
              setPhase(1);
            }}
          >
            Start Room
          </Button>
        </Stack>
      </>
    ),
    1: (
      <iframe
        className={styles.SlideContainer}
        src="https://slides.com/teamazen/palette/embed?style=light"
        title="Palette"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
    2: <Quiz resetPhase={resetPhase} />,
  };

  useEffect(() => {
    socketInitializer();

    let savedPhase = localStorage.getItem("phase");
    if (savedPhase) setCurrentPhase(savedPhase);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("set-phase", currentPhase);
    }
  }, [currentPhase]);

  async function socketInitializer() {
    socket = io(undefined, {
      path: "/api/socket",
    });

    socket.on("connect", (data) => {
      console.log(socket);
      setSock(socket);
      socket.emit("is-host", ""); // trigger current-users emit from server
    });

    // get current users
    socket.on("current-users", (data) => {
      let users = [];
      Object.values(data).map((val, ind) => {
        users.push(val);
      });
      setLobbyUsers(users);
    });

    // socket.on("quiz-questions", (data) => {
    //   console.log("got quiz questions", data)
    //   // setQnsList(data)
    //   storeQuizData(data)

    //   // let p = phaseList
    //   // p[2] = <Quiz data={data[2]} socket={socket}/>
    //   // setPhaseList(p)

    //   // phaseList[2] = <Quiz data={data[2]} socket={socket}/>
    // })

    // new user joins the lobby

    socket.on("new-user", (data) => {
      console.log("new user joined", data);
      // let u = lobbyUsers.push(data)
      let l = lobbyUsers;
      l.push(data);
      setLobbyUsers(l);
      // setLobbyUsers((pre) => [...pre, data])
      if (currentPhase === 0) {
        toast({
          title: "New User!",
          description: data.username + " just joined",
          position: "bottom-left",
          duration: 1000,
          isClosable: true,
        });
      }
      console.log(lobbyUsers);
    });
  }

  function setPhase(ind) {
    setCurrentPhase(ind);
    localStorage.setItem("phase", ind);
  }

  function nextPhase() {
    let p = parseInt(currentPhase) + 1;
    console.log(p);
    setCurrentPhase(p);
    localStorage.setItem("phase", p);
  }

  function resetPhase() {
    setCurrentPhase(0);
    localStorage.setItem("phase", 0);
  }

  return <>{phaseList[currentPhase]}</>;
}