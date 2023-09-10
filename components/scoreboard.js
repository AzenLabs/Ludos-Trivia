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
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { MainContext } from "../context/MainContext";
import {
  calculateAllTeamScoreboard,
  setScoreboardClassWinnerData,
} from "./scoreboard_functions";

export function ClassScoreboard({
  scoreboard,
  values,
  showUserStanding,
  classToShow,
}) {
  const { user } = useContext(UserContext);
  const [finalScoreboard, setFinalScoreboard] = useState([]);

  console.log("class scoreboard re-renders");

  useEffect(() => {
    console.log("re-renders inside class scoreboard");
    let scoreboardSub; // only include 10 studs in scoreboard
    if (showUserStanding) {
      // get list of 8 studs to show in scoreboard max
      let myStanding = scoreboard.indexOf(user.username);
      if (myStanding < 10) {
        scoreboardSub = scoreboard.slice(0, 5);
      } else if (myStanding > scoreboard.length - 5) {
        scoreboardSub = scoreboard.slice(
          scoreboard.length - 5,
          scoreboard.length + 1
        );
      } else {
        scoreboardSub = scoreboard.slice(myStanding - 2, myStanding + 3);
      }
    } else {
      scoreboardSub = scoreboard.slice(0, 5);
    }

    setFinalScoreboard(scoreboardSub);
  }, [scoreboard, showUserStanding, user.username]);

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
        {showUserStanding ? user.class : classToShow}
      </Text>
      {finalScoreboard &&
        finalScoreboard.map((stud) => (
          <HStack key={stud} gap={5}>
            <Text fontSize={["6vw", "2vw"]}>
              {scoreboard.indexOf(stud) + 1}
            </Text>
            <HStack
              outline={
                showUserStanding && stud == user.username
                  ? "2px #FFC63C solid"
                  : ""
              }
              background="#412272"
              px={3}
              borderRadius={10}
              py={1}
              w="100%"
              justify={"space-between"}
            >
              <Text fontSize={["6vw", "1.8vw"]}>{stud}</Text>
              <HStack p={3} borderRadius={20} boxShadow={"lg"}>
                <Text fontSize={"xl"}>{values[stud]}</Text>
                <Image src="/icons/emerald.png" w={"2vh"} />
              </HStack>
            </HStack>
          </HStack>
        ))}
      {showUserStanding && (
        <Text fontSize={["4.5vw", "2vw"]}>
          {finalScoreboard.includes(user.username) ? (
            <p>
              You are in #{finalScoreboard.indexOf(user.username) + 1} place!
            </p>
          ) : (
            <p>You do not have a placing yet. Keep trying!</p>
          )}
        </Text>
      )}
    </Stack>
  );
}

// Displayed for Presenter View
export function AllClassScoreboard({
  nextSection,
  standAlone = false,
  returnBankEmeralds = false,
}) {
  let { sock } = useContext(MainContext);
  const [scoreboardData, setScoreboardData] = useState();
  let { user, setEmeralds } = useContext(UserContext);

  useEffect(() => {
    if (sock) {
      sock.emit("get-scoreboard", "");

      sock.on("get-scoreboard", (data) => {
        setScoreboardData(data);
      });
    }
  }, [sock]);

  const addReturnBankEmeralds = useCallback(() => {
    let scoreboardData;
    console.log("inside add return bank emeralds", {
      returnBankEmeralds: returnBankEmeralds,
      user: user,
    });
    sock.emit("personal-bank-returns", user);

    sock.emit("get-scoreboard", "");

    sock.on("get-scoreboard", (data) => {
      scoreboardData = data;

      if (returnBankEmeralds) sock.emit("get-team-scoreboard", "");
      else setScoreboardData(scoreboardData);
    });

    if (returnBankEmeralds) {
      sock.on("get-team-scoreboard", (data) => {
        const classWinners = setScoreboardClassWinnerData(
          calculateAllTeamScoreboard(data)
        );
        const filteredData = {};

        Object.entries(scoreboardData).forEach(([className, classData]) => {
          if (classWinners[className]) {
            filteredData[className] = classData;
          }
        });
        setScoreboardData(filteredData);
      });
    }
  }, [returnBankEmeralds, user, sock]);

  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
        Scoreboard
      </Heading>

      {scoreboardData && (
        <Grid
          templateColumns={"repeat(4, 2fr)"}
          p={5}
          minH="90vh"
          w="100%"
          fontSize={"1.2em"}
        >
          {Object.keys(scoreboardData).map((key) => (
            <GridItem key={key}>
              <ClassScoreboard
                scoreboard={scoreboardData[key].scoreboard}
                values={scoreboardData[key].values}
                showUserStanding={false}
                classToShow={key}
              />
            </GridItem>
          ))}
        </Grid>
      )}
      {returnBankEmeralds ? (
        <Button
          onClick={addReturnBankEmeralds}
          maxW={"30vw"}
          alignSelf={"center"}
          bg="#EB7DFF"
          color="white"
          boxShadow={"lg"}
        >
          Return Emeralds from Bank
        </Button>
      ) : (
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
      )}
    </Stack>
  );
}

// Displayed for Student View
export function StandAloneClassScoreboard() {
  let { user } = useContext(UserContext);
  let { sock } = useContext(MainContext);
  let [componentToShow, setComponentToShow] = useState(<Spinner />);

  useEffect(() => {
    if (sock) {
      sock.on("get-scoreboard", (data) => {
        // console.log(data)
        let classScoreboard = data[user.class];
        setComponentToShow(
          <Center h="90vh" fontSize={"2em"}>
            <ClassScoreboard
              scoreboard={classScoreboard.scoreboard}
              values={classScoreboard.values}
              showUserStanding={true}
            />
          </Center>
        );
      });

      sock.emit("get-scoreboard", "");
    }
  }, [sock]);

  return <>{componentToShow}</>;
}
