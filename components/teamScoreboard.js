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

export function TeamScoreboard({ value, classToShow }) {
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

      // Add an event listener for "get-team-scoreboard" event
      sock.on("get-team-scoreboard", (data) => {
        setScoreboardData(data);
      });

      sock.on("stud-class-donation", () => {
        // Emit the "get-team-scoreboard" event after processing the "stud-class-donation" event
        sock.emit("get-team-scoreboard", "");
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        sock.off("stud-class-donation");
        sock.off("get-team-scoreboard", (data) => {
          setScoreboardData(data);
        });
      };
    }
  }, [sock]);

  function setScoreboardWinnerData() {
    // Convert the data object into an array of objects for easier sorting
    let dataArray = Object.entries(scoreboardData).map(
      ([className, classData]) => ({
        className,
        value: classData.value,
      })
    );

    // Sort the array in descending order based on the "value" property
    dataArray.sort((a, b) => b.value - a.value);

    // Get the top 4 classes
    const top4Classes = dataArray.slice(0, 4);

    // Convert the result back to the original format
    const result = top4Classes.reduce((acc, { className, value }) => {
      acc[className] = { value };
      return acc;
    }, {});

    setScoreboardData(result);
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
              setScoreboardWinnerData();
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
