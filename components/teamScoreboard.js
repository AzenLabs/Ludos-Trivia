import {
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
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
    if (sock) {
      // Emit the "get-team-scoreboard" event initially
      sock.emit("get-team-scoreboard", "");

      sock.on("stud-class-donation", () => {
        // Emit the "get-team-scoreboard" event after processing the "stud-class-donation" event
        sock.emit("get-team-scoreboard", "");
      });
      // Add an event listener for "get-team-scoreboard" event
      sock.on("get-team-scoreboard", (data) => {
        setScoreboardData(data);
      });
      // Clean up the event listeners when the component unmounts
      return () => {
        sock.off("stud-class-donation");
        sock.off("get-team-scoreboard", (data) => {
          setScoreboardData(data);
        });
      };
    }
  }, [sock, scoreboardData]);

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
                    value={scoreboardData[key].value}
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
                    value={scoreboardData[key].value}
                    classToShow={key}
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          <Button
            onClick={() => {
              setShowWinners(true);
              setScoreboardData(setScoreboardClassWinnerData(scoreboardData));
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
