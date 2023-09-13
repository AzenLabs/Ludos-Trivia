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
  Center,
} from "@chakra-ui/react";
import Quiz from "../components/quiz";
import { MainContext } from "../context/MainContext";
import { RepeatIcon } from "@chakra-ui/icons";
import HostAuth from "../components/host_auth";
import { AllClassScoreboard } from "../components/scoreboard";
import { AllTeamScoreboard } from "../components/teamScoreboard";
import { Armoury, ReviewTop4StudentPurchases } from "../components/armoury";
import RemoveUser from "../components/remove_user";
import { Feedback } from "../components/feedback";

export default function Host() {
  let toast = useToast();
  const [lobbyUsers, setLobbyUsers] = useState([]); // keeps track of all connected users

  let { currentPhase, setPhase, nextPhase, previousPhase, sock } =
    useContext(MainContext);

  function StudentAction() {
    return (
      <>
        <Center h="90vh">
          <Stack direction={"column"} textAlign={"center"} mt="10vh">
            <Heading>Save emeralds in your personal bank!</Heading>
            <Text fontSize={"xl"}>Look at your phone..</Text>
          </Stack>
        </Center>
      </>
    );
  }
  function showSlide(src) {
    return (
      <AspectRatio maxW="100%" maxH="95vh" ratio={2.1} mt={"15vh"}>
        <iframe
          src={src}
          width="576"
          height="420"
          title="CSS"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </AspectRatio>
    );
  }

  function startingLobby() {
    return (
      <Stack padding={8} gap={5}>
        <Flex justifyContent={"space-between"}>
          <HStack gap={5}>
            {/* Shows no. of people */}
            <HStack
              gap="4"
              alignItems="center"
              backgroundColor={"#412272"}
              borderRadius={10}
              px={3}
              minH={"5vh"}
            >
              <Box>
                <Heading size="lg">{lobbyUsers.length}</Heading>
              </Box>
              <Avatar size={"xs"} src="/icons/user icon.svg" />
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
            <RemoveUser/>
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
            <Text fontSize={"xl"}>Join at</Text>
            <Text fontSize={"3xl"}>http://ludos-trivia.azenlabs.com</Text>
            <Image src="/icons/qr.png" maxH={"20vh"} alt="emeralds" />
          </HStack>
        </Flex>
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
    );
  }

  let phaseList = {
    0: startingLobby(),
    1: showSlide("https://slides.com/teamazen/palette/embed"), // Intro
    2: showSlide("https://slides.com/teamazen/css/embed"), // Long term saving habits
    3: <Quiz />,
    4: showSlide("https://slides.com/teamazen/css-intro/embed"), // SSS
    5: <Quiz />,
    6: showSlide("https://slides.com/teamazen/css-intro-7aa436/embed"), //Needs and Wants
    7: <Quiz />,
    8: <AllClassScoreboard nextSection={nextPhase} standAlone={true} />,
    // PLAY (21 mins)
    9: <AllTeamScoreboard nextSection={nextPhase} standAlone={true} />,
    10: StudentAction(),
    11: <Armoury nextSection={nextPhase} standAlone={true} />,
    12: (
      <AllClassScoreboard
        nextSection={nextPhase}
        standAlone={true}
        returnBankEmeralds={true}
      />
    ),
    13: (
      <ReviewTop4StudentPurchases nextSection={nextPhase} standAlone={true} />
    ),
    14: showSlide("https://slides.com/teamazen/css-intro-db471d/embed"), // Final Fight
    15: <Feedback/>,
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
        if (currentPhase === 1) {
          toast({
            title: "New User!",
            description: data.username + " just joined",
            position: "bottom-left",
            duration: 1000,
            isClosable: true,
          });
        }
        console.log(lobbyUsers);
        sock.emit("current-users", ""); // get current users on render
      });
    }
  }, [sock]);

  useEffect(() => {
    if (sock) {
      sock.emit("set-phase", currentPhase);
    }
  }, [currentPhase, sock]);

  function parseConnectedUsers(data) {
    let users = [];
    Object.values(data).map((val, ind) => {
      users.push(val);
    });
    setLobbyUsers(users);
  }

  return (
    <>
      {sock ? phaseList[currentPhase] : <HostAuth />}
      {/* {phaseList[currentPhase]} */}

      {currentPhase > 0 && (
        <HStack
          pos={"fixed"}
          top={10}
          w="95vw"
          left={10}
          gap={5}
          justify={"space-between"}
        >
          <HStack
            gap="4"
            alignItems="center"
            backgroundColor={"#412272"}
            borderRadius={10}
            px={3}
            minH={"5vh"}
          >
            <Box>
              <Heading size="lg">{lobbyUsers.length}</Heading>
            </Box>
            <Avatar size={"xs"} src="/icons/user icon.svg" />
          </HStack>
          <HStack>
            <Button onClick={previousPhase}>Back</Button>
            <Button onClick={nextPhase}>Next Phase</Button>
          </HStack>
        </HStack>
      )}
    </>
  );
}
