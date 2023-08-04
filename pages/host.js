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
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Quiz from "../components/quiz";
import { MainContext } from "../context/MainContext";
import { RepeatIcon } from "@chakra-ui/icons";
import HostAuth from "../components/host_auth";

// let socket;

export default function Host() {
  let toast = useToast();
  const [lobbyUsers, setLobbyUsers] = useState([]); // keeps track of all connected users

  let { currentPhase, setPhase, nextPhase, previousPhase, sock } =
    useContext(MainContext);

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
        <Stack
          direction={"row"}
          position={"fixed"}
          bottom={5}
          w={"100%"}
          justify={"center"}
          spacing={10}
        >
          <IconButton
            icon={<RepeatIcon />}
            backgroundColor={"lightgrey.500"}
            onClick={() => {
              sock.emit("current-users", (data) => {
                parseConnectedUsers(data);
              });
            }}
          />
          <Button
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
        <AspectRatio maxW="100%" maxH="95vh" ratio={2.1}>
          <iframe
            src="https://slides.com/teamazen/palette/embed"
            width="576"
            height="420"
            title="CSS"
            scrolling="no"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </>
    ),
    2: <Quiz previousPhase={previousPhase} />,
  };

  useEffect(() => {
    if (sock) {
      sock.on("current-users", (data) => {
        parseConnectedUsers(data);
      });

      sock.on("new-user", (data) => {
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

      sock.emit("current-users", ""); // get current users on render
    }
  }, [sock]);

  useEffect(() => {
    if (sock) {
      sock.emit("set-phase", currentPhase);
    }
  }, [currentPhase]);

  function parseConnectedUsers(data) {
    let users = [];
    Object.values(data).map((val, ind) => {
      users.push(val);
    });
    setLobbyUsers(users);
  }

  // useEffect(() => {
  //   socketInitializer();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // async function socketHandler() {
  //   // socket = io(undefined, {
  //   //   path: "/api/socket",
  //   // });

  //   // socket.on("connect", (data) => {
  //   //   console.log(socket);
  //   //   setSock(socket);
  //   //   socket.emit("is-host", ""); // trigger current-users emit from server
  //   // });

  //   // get current users
  //   sock.on("current-users", (data) => {
  //     // let users = [];
  //     // Object.values(data).map((val, ind) => {
  //     //   users.push(val);
  //     // });
  //     // setLobbyUsers(users);
  //     parseConnectedUsers(data)
  //   });

  //   // new user joins the lobby
  //   sock.on("new-user", (data) => {
  //     console.log("new user joined", data);
  //     // let u = lobbyUsers.push(data)
  //     let l = lobbyUsers;
  //     l.push(data);
  //     setLobbyUsers(l);
  //     // setLobbyUsers((pre) => [...pre, data])
  //     if (currentPhase === 0) {
  //       toast({
  //         title: "New User!",
  //         description: data.username + " just joined",
  //         position: "bottom-left",
  //         duration: 1000,
  //         isClosable: true,
  //       });
  //     }
  //     console.log(lobbyUsers);
  //   });
  // }

  return (
    <>
      {sock ? phaseList[currentPhase] : <HostAuth />}

      {currentPhase > 0 && (
        <>
          <Button onClick={nextPhase} pos={"fixed"} right={10} top={10}>
            Next Phase
          </Button>
          <Button onClick={previousPhase} pos={"fixed"} left={10} top={10}>
            Back
          </Button>
        </>
      )}
    </>
  );
}
