import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

let socket;

export default function Lobby(){
  let { user, storeUser } = useContext(UserContext)
  const [lobbyUsers, setLobbyUsers] = useState([])

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

    socket.on("current-users", (data) => {
      setLobbyUsers(data)
    })

    // new user joins the lobby
    socket.on("new-user", (data) => {
      console.log("new user joined", data)
      // let u = lobbyUsers.push(data)
      setLobbyUsers((pre) => [...pre, data])
      console.log(lobbyUsers.length)
    })
  }

  return(
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} m={5}>
        {lobbyUsers.length > 0 && lobbyUsers.map(({ username, email }, index) => (
          <GridItem key={index} w='100%'  bg={"blue.500"} p={5} borderRadius={30} textColor={"white"}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={username} bg={"white"} />

              <Box>
                <Heading size='sm'>{username}</Heading>
                <Text>{email}</Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}