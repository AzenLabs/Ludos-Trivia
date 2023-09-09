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

function HostPresenting(){
  return (
    <>
      <Center h="90vh">
        <Stack direction={"column"} textAlign={"center"} mt="10vh">
          <Heading>Host is presenting...</Heading>
          <Text fontSize={"xl"}>Pay attention!</Text>
        </Stack>
      </Center>
      
    </>
  )
}


export default function Room(){
  let router = useRouter()

  let { user, storeUser, emeralds, setEmeralds, bankEmeralds, setBankEmeralds } = useContext(UserContext)
  let { team, teamEmeralds, setTeamEmeralds } = useContext(TeamContext);
  let { sock, setSock, currentPhase, setPhase } = useContext(MainContext)
  // const [ currentPhase, setCurrentPhase ] = useState(0) // controls the current phase

  // phase dict
  const [ phaseList, setPhaseList ] = useState({
    0: <Lobby/>,
    1: HostPresenting(),
    2: HostPresenting(),
    3: <QuizOptions/>,
    4: <StandAloneClassScoreboard />,
    5: <ClassReserves />,
    6: <PersonalBank />,
    7: <StandAloneArmoury/>,
  })

  useEffect(() => {
    socketHandler();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {   // when user data loaded, emit to socket new user
    if(user){
      if(Object.keys(user).length !== 0){
        console.log(user)
        socket.emit("new-user", user)   // emit new user joined without emerald information
      }
    }
  }, [user])

  // init socket connection
  async function socketHandler() {

    socket = io(undefined, {
      path:'/api/socket'
    });

    socket.on("connect", (data) => {
      console.log(socket)
      setSock(socket)
    });

    socket.on("current-emeralds", (data) => {
      setEmeralds(data)
    })

    socket.on("current-bank-emeralds", (data) => {
      setBankEmeralds(data)
    })

    socket.on("current-team-emeralds", (data) => {
      setTeamEmeralds(data);
    })
    socket.on("current-phase", (data) => {
      console.log(data)
      setPhase(data)
    })
  }


  return(
    <>
      {phaseList[currentPhase]}
      {/* Displays bottom right emeralds of the student */}
      <HStack bg="#412272" pos="fixed" p={3} borderRadius={20} right={"5vw"}
        boxShadow={"lg"} bottom={"3vh"}
      >
        <Text fontSize={"xl"}>{emeralds}</Text> 
        <Image src="/icons/emerald.png" w={"4vw"}/>
      </HStack>
    </>
  )
}