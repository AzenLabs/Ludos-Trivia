import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Lobby from "../components/lobby";
import SlideContainer from "../components/slides";
import Slide1 from "../components/slides/slide_1";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import QuizOptions from "../components/quiz_options";
import { MainContext } from "../context/MainContext";

// const Slide1 = dynamic(() => import("../components/slides/slide_1"), { ssr: false, })

let socket;


export default function Room(){
  let { user, storeUser, emeralds, setEmeralds } = useContext(UserContext)
  let { sock, setSock } = useContext(MainContext)
  const [ currentPhase, setCurrentPhase ] = useState(0) // controls the current phase

  // phase dict
  const [ phaseList, setPhaseList ] = useState({
    0: <Lobby/>,
    1: <>
      <Stack direction={"column"} textAlign={"center"} mt="10vh">
        <Heading>Host is presenting</Heading>
        <Text>Pay attention!</Text>
      </Stack>
    </>,
    2: <QuizOptions/>
  })

  useEffect(() => {
    socketHandler();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {   // when user data loaded, emit to socket new user
    if(Object.keys(user).length !== 0){
      console.log(user)
      socket.emit("new-user", user)   // emit new user joined without emerald information
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

    socket.on("current-phase", (data) => {
      setPhase(data)
    })
  }

  function setPhase(ind){    // change the component based on phase list
    // setCurrentComponent(phaseList[ind])
    setCurrentPhase(ind)
  }

  return(
    <>
    {/* {currentComponent} */}
    {phaseList[currentPhase]}
    <Stack pos={"fixed"} bottom={0} textAlign={"center"} w="100%"
      bg="lightblue" py={2}
    >
        <Text fontSize={"2vw"}>{emeralds} emeralds</Text>
      </Stack>
    </>
  )
}