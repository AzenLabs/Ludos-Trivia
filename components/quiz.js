import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { MainContext } from "../context/MainContext";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { AllClassScoreboard } from "./scoreboard";
import QuizContextProvider, { QuizContext } from "../context/QuizContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function QuizStart(props){
  let { currentPhase, sock } = useContext(MainContext)
  let { quizData } = useContext(QuizContext)

  return (
    <>
      <Center h="90vh">
        <Stack gap={10} alignItems={"center"}>
          <Heading>{quizData[currentPhase].title}</Heading>
          <Text fontSize={"xl"}>{props.description}</Text>
          <Button
            bg="#EB7DFF" textColor={"white"}
            disabled={sock == undefined ? false : true} maxW={"12vw"}
            onClick={() => {
              props.nextSection("question")
            }}
          >
            Start Quiz
          </Button>
        </Stack>
      </Center>
    </>
  );
}

function Question({ data, nextSection }) {
  const [showResults, setShowResults] = useState(false);
  const [optionAnsCount, setOptionAnsCount] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    all: 0
  });
  let { sock } = useContext(MainContext);

  const qnsTimer = 5;

  const { seconds, isRunning, start, pause, resume, restart } = useTimer({
    qnsTimer,
    onExpire: () => finishTimer(),
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + qnsTimer); // 10 minutes timer
    restart(time);

    console.log(data);
  }, [data]);

  useEffect(() => {
    if (sock) {
      sock.on("stud-answer", (data) => {
        console.log("a student answered the thing")
        let o = optionAnsCount
        console.log(o)
        o[data] += 1
        o["all"] += 1
        setOptionAnsCount(o)
      })
      console.log(sock)
    }
  }, [sock]);

  function finishTimer() {
    setShowResults(true);
    sock.emit("show-results", "");
  }

  function returnCorrect(ind) {
    if (showResults) {
      return data.correct == ind ? <CheckIcon /> : <CloseIcon />;
    } else {
      return;
    }
  }

  return (
    <>
      <Stack h="100vh" px="10">
        <Center h="15vh">
          <Heading>{data.qns}</Heading>
        </Center>
        <HStack justify={"space-between"}>
          <CountdownCircleTimer
            isPlaying
            duration={qnsTimer}
            colors={['#977FBB']}
            size={"90"}
          >
            {({ remainingTime }) => seconds}
          </CountdownCircleTimer>
          {showResults && <Button onClick={() => {
            setShowResults(false)
            nextSection("scoreboard")
          }}>
              Show Results
            </Button>}
          <HStack gap="4" alignItems="center" 
              borderRadius={10} 
              px={3} minH={"5vh"}
            >
              <Box>
                <Heading size="lg">{optionAnsCount["all"]}</Heading>
              </Box>
              <Avatar size={"xs"} src="/icons/user icon.svg"/>
            </HStack>
        </HStack>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3} p={3} h="70vh" className="red-bg">
          <GridItem bg={"red.500"} textAlign={"center"} textColor={"white"} h="33vh">
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"} direction={"row"} px={5}>
                {showResults && (
                  <Stack alignItems={"center"} minW={"10vw"}>
                    {returnCorrect(0)}
                    {/* {showResults && <Text>{optionAnsCount[0]} chose this</Text>} */}
                    <HStack gap="4" alignItems="center" 
                      borderRadius={10} 
                      px={3} minH={"5vh"}
                    >
                      <Box>
                        <Heading size="lg">{optionAnsCount["all"]}</Heading>
                      </Box>
                      <Image w="2vw" src="/icons/user alt.png"/>
                    </HStack>
                  </Stack>
                )}
                
                <Stack>
                  <Text>A.</Text>
                  <Text>{data.options[0]}</Text>
                </Stack>
                
                
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"blue.500"} textAlign={"center"} textColor={"white"} h="33vh">
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"} direction={"row"} px={5}>
                {showResults && (
                  <Stack alignItems={"center"} minW={"10vw"}>
                    {returnCorrect(1)}
                    {/* {showResults && <Text>{optionAnsCount[0]} chose this</Text>} */}
                    <HStack gap="4" alignItems="center" 
                      borderRadius={10} 
                      px={3} minH={"5vh"}
                    >
                      <Box>
                        <Heading size="lg">{optionAnsCount["all"]}</Heading>
                      </Box>
                      <Image w="2vw" src="/icons/user alt.png"/>
                    </HStack>
                  </Stack>
                )}
                
                <Stack>
                  <Text>B.</Text>
                  <Text>{data.options[1]}</Text>
                </Stack>
                
                
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"green.500"} textAlign={"center"} textColor={"white"} h="33vh">
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"} direction={"row"} px={5}>
                {showResults && (
                  <Stack alignItems={"center"} minW={"10vw"}>
                    {returnCorrect(2)}
                    {/* {showResults && <Text>{optionAnsCount[0]} chose this</Text>} */}
                    <HStack gap="4" alignItems="center" 
                      borderRadius={10} 
                      px={3} minH={"5vh"}
                    >
                      <Box>
                        <Heading size="lg">{optionAnsCount["all"]}</Heading>
                      </Box>
                      <Image w="2vw" src="/icons/user alt.png"/>
                    </HStack>
                  </Stack>
                )}
                
                <Stack>
                  <Text>C.</Text>
                  <Text>{data.options[2]}</Text>
                </Stack>
                
                
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"yellow.500"} textAlign={"center"} textColor={"white"} h="33vh">
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"} direction={"row"} px={5}>
                {showResults && (
                  <Stack alignItems={"center"} minW={"10vw"}>
                    {returnCorrect(3)}
                    {/* {showResults && <Text>{optionAnsCount[0]} chose this</Text>} */}
                    <HStack gap="4" alignItems="center" 
                      borderRadius={10} 
                      px={3} minH={"5vh"}
                    >
                      <Box>
                        <Heading size="lg">{optionAnsCount["all"]}</Heading>
                      </Box>
                      <Image w="2vw" src="/icons/user alt.png"/>
                    </HStack>
                  </Stack>
                )}
                
                <Stack>
                  <Text>D.</Text>
                  <Text>{data.options[3]}</Text>
                </Stack>
                
                
              </Stack>
            </Center>
          </GridItem>
        </Grid>

      </Stack>
    </>
  );
}

// host view to show qns and answers
function Quiz(){
  const [currentQns, setCurrentQns] = useState()  // holds current component to show

  let { currentPhase, sock, nextPhase } = useContext(MainContext)
  let { quizData, quizProgress, nextQuizProgress } = useContext(QuizContext)

  useEffect(() => {
    console.log(quizData);
    if (sock == undefined) setCurrentQns(<Spinner />);

    if(quizProgress === 0 && quizData) setCurrentQns(<QuizStart nextSection={nextSection} title={quizData[currentPhase].title} description={quizData[currentPhase].description}/>)
    else if (quizProgress <= quizData[currentPhase].qns.length){
      setCurrentQns(<Question key={quizProgress} data={quizData[currentPhase].qns[quizProgress - 1]} nextSection={nextSection}/>)
      sock.emit("show-question", quizProgress)
    }else if(quizProgress > quizData[currentPhase].qns.length){
      nextPhase()
    }else{
      console.log("huh")
    }
  }, [quizProgress, quizData, sock])

  function nextSection(page){
    
    if(page == "question"){
      console.log("going to next question..")
      nextQuizProgress()
    }else if(page == "scoreboard"){
      console.log("going to scoreboard...")
      // sock.emit("get-scoreboard", "")   // trigger to show scoreboard also for the rest
      setCurrentQns(<AllClassScoreboard nextSection={nextSection}/>)
    }
    
  }

  return (
    <>
      {currentQns}
    </>
  );
}

export default function QuizWrapper(){
  return (
    <QuizContextProvider>
      <Quiz/>
    </QuizContextProvider>
  )
}
