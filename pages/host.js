import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, Stack, Text, useToast } from "@chakra-ui/react";

let socket;

export default function Host(){
  let toast = useToast()
  const [lobbyUsers, setLobbyUsers] = useState([])

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {

    socket = io(undefined, {
      path:'/api/socket'
    });

    socket.on("connect", (data) => {
      console.log(socket)
    });


    // get current users
    socket.on("current-users", (data) => {
      let users = []
      Object.values(data).map((val, ind) => {
        users.push(val)
      })
      setLobbyUsers(users)
    })

    // new user joins the lobby
    socket.on("new-user", (data) => {
      console.log("new user joined", data)
      // let u = lobbyUsers.push(data)
      setLobbyUsers((pre) => [...pre, data])
      toast({
        title: 'New User!',
        description: data.username + " just joined",
        position: "bottom-left",
        duration: 1000,
        isClosable: true,
      })
    })
  }

  return(
    <>
      <Heading textAlign={"center"} my="4">{lobbyUsers.length} Users Total</Heading>
      <Grid templateColumns='repeat(5, 1fr)' gap={6} m={5}>
        {lobbyUsers.length > 0 && lobbyUsers.map((user, index) => (
          <GridItem key={index}  bg={"blue.500"} p={5} borderRadius={30} textColor={"white"}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={user.username} bg={"white"} textColor={"black"} />

              <Box>
                <Heading size='sm'>{user.username}</Heading>
                <Text>{user.class}</Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
      <Stack direction={"row"} position={"fixed"} bottom={5} w={"100%"}>
        <Button mx="auto" colorScheme="red">
          Start Room
        </Button>
      </Stack>
      
    </>
  )
}