import { Avatar, Box, Button, Center, Flex, Grid, GridItem, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Lobby(){
  let router = useRouter()
  let { user, storeUser, emeralds, setEmeralds } = useContext(UserContext)

  return (
    <>
      <Heading textAlign={"center"} my="4"><Spinner mr={3}/>Waiting for Host...</Heading>
      <Stack textAlign={"center"} spacing={5}>
        <Text>{user.username}</Text>
        <Text>{user.class}</Text>
        <Button colorScheme="red" maxW="20vw" alignSelf={"center"}
          onClick={() => {router.push("/")}}
        >Leave Lobby</Button>
      </Stack>
      <Stack pos={"fixed"} bottom={5} textAlign={"center"} w="100%">
        <Text fontSize={"2vw"}>{emeralds} emeralds</Text>
      </Stack>
    </>
  )
}