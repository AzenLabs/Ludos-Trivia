import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { UserContext } from "../context/UserContext";
import {
  Center,
  Heading,
  Stack,
  Table,
  Text,
  Spinner,
  TableCaption,
  Image,
} from "@chakra-ui/react";
import { ClassScoreboard } from "./scoreboard";
import QuizContextProvider, { QuizContext } from "../context/QuizContext";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export function ClassReserves() {
  let { sock } = useContext(MainContext);
  let { user, emeralds, setEmeralds, bankEmeralds, setBankEmeralds } =
    useContext(UserContext);
  let [message, setMessage] = useState("You donated to the class fund!");

  const [donated, setDonated] = useState(false);
  let ans = {};

  function handleImageClick() {
    if (sock) {
      ans = user;
      sock.emit("stud-class-donation", ans);

      sock.on("stud-class-donation", (data) => {
        if (data == "You have no emeralds!") setMessage(data);
      });

      setDonated(true);
    }
  }

  useEffect(() => {}, [donated]);

  return (
    <>
      {donated ? (
        <Center h="90vh">
          <Stack alignItems={"center"} textAlign={"center"}>
            <Heading>{message}</Heading>
            <Text>Waiting for host...</Text>
            <Spinner mr={3} speed="0.6s" size={"lg"} thickness="6px" />
          </Stack>
        </Center>
      ) : (
        <>
          <Stack textAlign={"center"} h="10vh">
            <Heading mt={10}>Class Reserve</Heading>
            <Text fontSize={"xl"}>30% of your emeralds should go here.</Text>
          </Stack>

          <Center h="80vh">
            <Image
              src="./img/chest 1.png"
              alt="class reserve box"
              maxH={"30vh"}
              onClick={() => {
                handleImageClick();
              }}
              style={{ cursor: "pointer" }}
            />
          </Center>
        </>
      )}
    </>
  );
}

export function PersonalBank() {
  let { sock } = useContext(MainContext);
  let { user, setEmeralds } = useContext(UserContext);
  let [message, setMessage] = useState("You stored your emeralds in the bank!");

  const [donated, setDonated] = useState(false);
  let ans = {};

  function handleImageClick() {
    if (sock) {
      ans = user;
      sock.emit("stud-personal-bank", ans);

      sock.on("stud-personal-bank", (data) => {
        if (data == "You have no emeralds!") setMessage(data);
      });

      setDonated(true);
    }
  }

  return (
    <>
      {donated ? (
        <Center h="90vh">
          <Stack alignItems={"center"} textAlign={"center"}>
            <Heading>{message}</Heading>
            <Text>Waiting for host...</Text>
            <Spinner mr={3} speed="0.6s" size={"lg"} thickness="6px" />
          </Stack>
        </Center>
      ) : (
        <>
          <Stack textAlign={"center"} h="10vh">
            <Heading mt={10}>Personal Bank</Heading>
            <Text fontSize={"xl"}>20% of your emeralds should go here.</Text>
          </Stack>

          <Center h="80vh">
            <Image
              src="./img/chest 1.png"
              alt="personal bank box"
              maxH={"30vh"}
              onClick={() => {
                handleImageClick();
              }}
              style={{ cursor: "pointer" }}
            />
          </Center>
        </>
      )}
    </>
  );
}
