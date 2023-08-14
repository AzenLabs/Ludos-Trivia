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
        <Center h="90vh">
          <Stack textAlign={"center"} spacing={10} alignItems={"center"}>
            <Heading textAlign={"center"} my="4">Waiting for Host...</Heading>
            <Spinner mr={3} speed="0.6s" size={"lg"} thickness="6px"/>
            <Stack borderRadius={10} w={"40vw"} color={"#36294D"} bg={"#FFA7BB"} textAlign={"left"}
              p={3} px={5} boxShadow={"lg"}
            >
              <Text fontSize={"xl"}>{user.username}</Text>
              <Text>{user.class}</Text>
            </Stack>
            <Button bg="#EB7DFF" alignSelf={"center"} color={"white"} borderRadius={10} boxShadow={"md"}
              onClick={() => {router.push("/")}}
            >Leave Lobby</Button>
          </Stack>
        </Center>
      </>
    )}
    </>
  )
}