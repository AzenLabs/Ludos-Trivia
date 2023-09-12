import {
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { setScoreboardClassWinnerData } from "./scoreboard_functions";

export function TeamScoreboard({ value, classToShow }) {
  useEffect(() => {}, []);

  return (
    <Stack
      gap={4}
      textAlign={"center"}
      background={"#311955"}
      borderRadius={10}
      px={5}
      py={3}
      m={5}
      minW={["70vw", "auto"]}
    >
      <Text fontSize={["6vw", "2vw"]} fontWeight={"bold"}>
        {classToShow}
      </Text>

      <Center>
        <HStack p={3} borderRadius={20} boxShadow={"lg"}>
          <Text fontSize={"xl"}>{value}</Text>
          <Image src="/icons/emerald.png" w={"2vh"} alt={"emerald image"} />
        </HStack>
      </Center>
    </Stack>
  );
}

export function AllTeamScoreboard({ nextSection, standAlone = false }) {
  let { sock } = useContext(MainContext);
  const [scoreboardData, setScoreboardData] = useState();
  const [showWinners, setShowWinners] = useState(false);

  useEffect(() => {
    if (sock && !showWinners) {
      sock.emit("get-scoreboard", "");

      sock.on("get-scoreboard", (data) => {
        setScoreboardData(data);
      });

      return () => {
        sock.off("get-scoreboard");
      };
    }
  }, [sock, showWinners]);

  useEffect(() => {
    if (sock && !showWinners) {
      // Add an event listener for "stud-class-donation" event
      sock.on("stud-class-donation", () => {
        sock.emit("get-scoreboard", "");
      });

      sock.on("get-scoreboard", (data) => {
        setScoreboardData(data);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        sock.off("stud-class-donation");
        sock.off("get-scoreboard");
      };
    }
  }, [sock, showWinners]);

  function onGetWinnerData() {
    const winnerData = setScoreboardClassWinnerData(scoreboardData);
    setScoreboardData(winnerData);
    sock.emit("put-top-classes", winnerData);
  }

  return (
    <>
      {showWinners ? (
        <Stack pb={10}>
          <Heading textAlign={"center"} mt={10}>
            Classes Advancing to Final Fight
          </Heading>

          {scoreboardData && (
            <Grid
              templateColumns={"repeat(4, 2fr)"}
              p={5}
              minH="30vh"
              w="100%"
              fontSize={"1.2em"}
            >
              {Object.keys(scoreboardData).map((key) => (
                <GridItem key={key}>
                  <TeamScoreboard
                    value={scoreboardData[key].store}
                    classToShow={key}
                  />
                </GridItem>
              ))}
            </Grid>
          )}
          <Button
            onClick={() => {
              if (standAlone) nextSection(); // next phase
              else nextSection("question"); // next quiz qns
            }}
            maxW={"15vw"}
            alignSelf={"center"}
            bg="#EB7DFF"
            color="white"
            boxShadow={"lg"}
          >
            {standAlone ? "Next Activity" : "Next Question"}
          </Button>
        </Stack>
      ) : (
        <Stack pb={10}>
          <Heading textAlign={"center"} mt={10}>
            Class Reserves
          </Heading>

          {scoreboardData && (
            <Grid
              templateColumns={"repeat(4, 2fr)"}
              p={5}
              minH="30vh"
              w="100%"
              fontSize={"1.2em"}
            >
              {Object.keys(scoreboardData).map((key) => (
                <GridItem key={key}>
                  <TeamScoreboard
                    value={scoreboardData[key].store}
                    classToShow={key}
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          <Button
            onClick={() => {
              setShowWinners(true);
              onGetWinnerData();
            }}
            maxW={"30vw"}
            alignSelf={"center"}
            bg="#EB7DFF"
            color="white"
            boxShadow={"lg"}
          >
            Present Top 4 Classes
          </Button>
        </Stack>
      )}
    </>
  );
}
