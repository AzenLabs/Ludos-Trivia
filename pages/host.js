import { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  AspectRatio,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Quiz from "../components/quiz";
import { MainContext } from "../context/MainContext";
import { RepeatIcon } from "@chakra-ui/icons";
import HostAuth from "../components/host_auth";
import { AllClassScoreboard } from "../components/scoreboard";

// let socket;

export default function Host() {
  let toast = useToast();
  const [lobbyUsers, setLobbyUsers] = useState([]); // keeps track of all connected users

  let { currentPhase, setPhase, nextPhase, previousPhase, sock } =
    useContext(MainContext);

  let phaseList = {
    0: (
      <Stack padding={8} gap={5}>
        <Flex justifyContent={"space-between"}>
          <HStack gap={5}>
            <HStack gap="4" alignItems="center" backgroundColor={"#412272"} 
              borderRadius={10}
              px={3} minH={"5vh"}
            >
              <Box>
                <Heading size="lg">{lobbyUsers.length}</Heading>
              </Box>
              <Avatar size={"xs"} src="/icons/user icon.svg"/>
            </HStack>
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
              backgroundColor={"#EB7DFF"}
              onClick={() => {
                setPhase(1);
              }}
              minH={"5vh"}
              borderRadius={10}
              color={"white"}
            >
              Start
            </Button>
          </HStack>
          <HStack gap={5}>
            <Text fontSize={"lg"}>Scan QR code to join the room:</Text>
            <Image src="/icons/qr.png" maxH={"10vh"}/>
          </HStack>
        </Flex>
        {/* class users */}
        {/* <Stack backgroundColor={"#412272"} p={5} borderRadius={10} boxShadow={"md"} gap={5}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"lg"}>3 Empathy</Text>
            <HStack gap="3" alignItems="center" mr={3}>
              <Box>
                <Heading size="md">{lobbyUsers.length}</Heading>
              </Box>
              <Image w="2vw" src="/icons/user alt.png"/>
            </HStack>
            
          </Flex>
          <HStack overflowX={"auto"} align="flex-start" gap={5} sx={
            { 
              '::-webkit-scrollbar':{
                background: "#512A8E",
                borderRadius: "20px",
                height: "8px"
              }
            }
          } pb={3}>
              <Stack backgroundColor={"#FFA7BB"} p={3} borderRadius={10} minW={"12vw"} color={"#36294D"}>
                <Text fontWeight={"bold"}>Angeline</Text>
                <Text>3 Empathy</Text>
              </Stack>
              {lobbyUsers["3 Empathy"].length > 0 &&
                lobbyUsers["3 Empathy"].map((user, index) => (
                  <Stack backgroundColor={"#FFA7BB"} p={3} borderRadius={10} minW={"12vw"} color={"#36294D"}>
                    <Text fontWeight={"bold"}>{user.username}</Text>
                    <Text>{user.class}</Text>
                  </Stack>
                ))}
            </HStack>
        </Stack> */}
        <Grid templateColumns="repeat(5, 1fr)" gap={6} m={5}>
          {lobbyUsers.length > 0 &&
            lobbyUsers.map((user, index) => (
              <GridItem
                key={index}
                backgroundColor={"#FFA7BB"}
                p={5}
                borderRadius={20}
                textColor={"white"}
              >
                <Stack borderRadius={10} minW={"12vw"} color={"#36294D"}>
                  <Text fontWeight={"bold"}>{user.username}</Text>
                  <Text>{user.class}</Text>
                </Stack>
              </GridItem>
            ))}
        </Grid>
      </Stack>
    ),
    1: (
      <>
        <AspectRatio maxW="100%" maxH="95vh" ratio={2.1} mt={"15vh"}>
          <iframe
            src="https://slides.com/teamazen/palette/embed"
            width="576"
            height="420"
            title="CSS"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </>
    ),
    2: <>
      <AspectRatio maxW="100%" maxH="95vh" ratio={2.1} mt={"15vh"}
      >
        <iframe src="https://slides.com/teamazen/css/embed" width="576" height="420" title="Long Term Saving Habits" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        
      </AspectRatio>
    </>,
    3: <Quiz/>,
    4: <AllClassScoreboard nextSection={nextPhase} standAlone={true} />
  };

  useEffect(() => {
    if (sock) {
      sock.on("current-users", (data) => {
        parseConnectedUsers(data);
        // console.log(data)
        // setLobbyUsers(data)
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



  return (
    <>
      {currentPhase != 0 && (
        <HStack gap="4" alignItems="center" backgroundColor={"#412272"} 
          borderRadius={10} pos={"fixed"} left={8} top={8}
          px={3} minH={"5vh"}
        >
          <Box>
            <Heading size="lg">{lobbyUsers.length}</Heading>
          </Box>
          <Avatar size={"xs"} src="/icons/user icon.svg"/>
        </HStack>
      )}
      
      {sock ? phaseList[currentPhase] : <HostAuth />}
      {/* {phaseList[currentPhase]} */}

      {currentPhase > 0 && (
        <HStack pos={"fixed"} top={10} w="95vw" left={10}
          gap={5} justify={"space-between"}
        >
          <HStack gap="4" alignItems="center" backgroundColor={"#412272"} 
            borderRadius={10}
            px={3} minH={"5vh"}
          >
            <Box>
              <Heading size="lg">{lobbyUsers.length}</Heading>
            </Box>
            <Avatar size={"xs"} src="/icons/user icon.svg"/>
          </HStack>
          <HStack>
            <Button onClick={previousPhase}>
              Back
            </Button>
            <Button onClick={nextPhase}>
              Next Phase
            </Button>
          </HStack>
        </HStack>
      )}
    </>
  );
}
