import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { TeamContext } from "../context/TeamContext";
import { useRouter } from "next/router";
import Lobby from "../components/room_lobby";
import { Center, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import QuizOptions from "../components/quiz_options";
import { MainContext } from "../context/MainContext";
import { StandAloneClassScoreboard } from "../components/scoreboard";
import { ClassReserves, PersonalBank } from "../components/reserves";
import { StandAloneArmoury } from "../components/armoury";

// const Slide1 = dynamic(() => import("../components/slides/slide_1"), { ssr: false, })

let socket;

function HostPresenting() {
  return (
    <>
      <Center h="90vh">
        <Stack direction={"column"} textAlign={"center"} mt="10vh">
          <Heading>Host is presenting...</Heading>
          <Text fontSize={"xl"}>Pay attention!</Text>
        </Stack>
      </Center>
    </>
  );
}

export default function Room() {
  let router = useRouter();

  let {
    user,
    storeUser,
    emeralds,
    setEmeralds,
    bankEmeralds,
    setBankEmeralds,
  } = useContext(UserContext);
  let { team, teamEmeralds, setTeamEmeralds } = useContext(TeamContext);
  let { sock, setSock, currentPhase, setPhase } = useContext(MainContext);
  // const [ currentPhase, setCurrentPhase ] = useState(0) // controls the current phase

  // phase dict
  const [phaseList, setPhaseList] = useState({
    0: <Lobby />,
    1: HostPresenting(),
    2: HostPresenting(),
    3: HostPresenting(),
    4: HostPresenting(),
    5: HostPresenting(),
    6: <QuizOptions />,
    7: <StandAloneClassScoreboard />,
    8: <ClassReserves />,
    9: <PersonalBank />,
    10: <StandAloneArmoury />,
    11: <StandAloneClassScoreboard />,
    12: HostPresenting(),
  });

  useEffect(() => {
    socketHandler();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // when user data loaded, emit to socket new user
    if (user) {
      if (Object.keys(user).length !== 0) {
        socket.emit("new-user", user); // emit new user joined without emerald information
      }
    }
  }, [user]);

  // init socket connection
  async function socketHandler() {
    socket = io(undefined, {
      path: "/api/socket",
    });

    socket.on("connect", (data) => {
      setSock(socket);
    });

    socket.on("current-emeralds", (data) => {
      setEmeralds(data);
    });

    socket.on("current-bank-emeralds", (data) => {
      setBankEmeralds(data);
    });

    socket.on("current-team-emeralds", (data) => {
      setTeamEmeralds(data);
    });
    socket.on("current-phase", (data) => {
      setPhase(data);
    });
  }

  return (
    <>
      {phaseList[currentPhase]}
      {/* Displays bottom right emeralds of the student */}
      {currentPhase in [10] ? (
        ""
      ) : (
        <HStack
          bg="#412272"
          pos="fixed"
          p={3}
          borderRadius={20}
          right={"5vw"}
          boxShadow={"lg"}
          bottom={"3vh"}
        >
          <Text fontSize={"xl"}>{emeralds}</Text>
          <Image src="/icons/emerald.png" w={"4vw"} />
        </HStack>
      )}
    </>
  );
}
