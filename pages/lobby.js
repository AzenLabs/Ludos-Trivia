import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { Avatar, Box, Button, Center, Flex, Grid, GridItem, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

let socket;

export default function Lobby(){
  let { user, storeUser } = useContext(UserContext)
  let router = useRouter()

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {   // when user data loaded, emit to socket new user
    if(Object.keys(user).length !== 0){
      console.log(user)
      socket.emit("new-user", user)
    }
  }, [user])

  // init socket connection
  async function socketInitializer() {

    socket = io(undefined, {
      path:'/api/socket'
    });

    socket.on("connect", (data) => {
      console.log(socket)
    });

  }

  return(
    <>
      <Heading textAlign={"center"} my="4"><Spinner mr={3}/>Waiting for Host...</Heading>
      <Stack textAlign={"center"} spacing={5}>
        <Text>{user.username}</Text>
        <Text>{user.class}</Text>
        <Button colorScheme="red" maxW="20vw" alignSelf={"center"}
          onClick={() => {router.push("/")}}
        >Leave Lobby</Button>
      </Stack>
    </>
  )
}