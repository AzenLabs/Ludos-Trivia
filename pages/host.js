import { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  AspectRatio,
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
import SlideContainer from "../components/slides";
import SlideIntro from "../components/slides/slide_intro";
import SlideLongTermSavingHabits from "../components/slides/slide_ltsh";

let socket;

export default function Host() {
  let toast = useToast();
  const [lobbyUsers, setLobbyUsers] = useState([]);
  // const [ currentPhase, setCurrentPhase ] = useState(0) // controls the current phase

  // const [ qnsList, setQnsList ] = useState()    // store list of all quiz questions
  let { currentPhase, setPhase, nextPhase, resetPhase, setSock } = useContext(MainContext);

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
      <>
        <AspectRatio maxW="100%" maxH="95vh" ratio={2.1}
        >
          <iframe src="https://slides.com/teamazen/palette/embed" width="576" height="420" title="CSS" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
          
        </AspectRatio>
        <Button onClick={nextPhase}
          pos={"fixed"} right={10} top={10}
        >Next Phase</Button>
      </>
    ),
    2: <>
    <AspectRatio maxW="100%" maxH="95vh" ratio={2.1}
    >
      <iframe src="https://slides.com/teamazen/css/embed" width="576" height="420" title="Long Term Saving Habits" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
      
    </AspectRatio>
    <Button onClick={nextPhase}
      pos={"fixed"} right={10} top={10}
    >Next Phase</Button>
    </>,
    3: <Quiz/>,
  };

  useEffect(() => {
    socketInitializer();

    // let savedPhase = localStorage.getItem("phase");
    // if (savedPhase) setCurrentPhase(savedPhase);

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

  return <>
    {phaseList[currentPhase]}
    <Button
      onClick={resetPhase}
      position="absolute"
      bottom="2rem"
      left="50%"
      transform="translateX(-50%)">
      Reset
    </Button>
  </>;
}