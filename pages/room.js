import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Lobby from "../components/lobby";
import SlideContainer from "../components/slides";

// const Slide1 = dynamic(() => import("../components/slides/slide_1"), { ssr: false, })

let socket;


export default function Room(){
  let { user, storeUser, emeralds, setEmeralds } = useContext(UserContext)
  let router = useRouter()
  const [ currentComponent, setCurrentComponent ] = useState()

  // phase dict
  let phaseList = {
    0: <Lobby/>,
    1: <SlideContainer/>
  }

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
    });

    socket.on("current-emeralds", (data) => {
      setEmeralds(data)
    })

    socket.on("current-phase", (data) => {
      setPhase(data)
    })
  }

  function setPhase(ind){    // change the component based on phase list
    setCurrentComponent(phaseList[ind])
  }

  return(
    <>
    {currentComponent}
    </>
  )
}