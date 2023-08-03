import { Avatar, Box, Button, Center, Flex, Grid, GridItem, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Lobby(){
  let router = useRouter()
  let { user } = useContext(UserContext)

  useEffect(() => {
    try{
      let u = user.username
    }catch{
      router.push("/")
    }
  }, [user])

  return (
    <>
      {user && (
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
    )}
    </>
  )
}