import { Button, Center, Grid, GridItem, Heading, Spinner, Stack, Text, useConst, useCounter } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { MainContext } from "../context/MainContext";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { AllClassScoreboard } from "./scoreboard";
import QuizContextProvider, { QuizContext } from "../context/QuizContext";

function QuizStart(props){
  let { currentPhase, sock } = useContext(MainContext)
  let { quizData } = useContext(QuizContext)

  return (
    <>
      <Center h="90vh">
        <Stack gap={10}>
          <Heading>{quizData[currentPhase].title}</Heading>
          <Text>{props.description}</Text>
          <Button bgColor={"blue.500"} textColor={"white"} disabled={(sock==undefined)?false:true}
            onClick={() => {
              props.nextSection("question")
            }}
          >Start Quiz</Button>
        </Stack>
      </Center>
    </>
  )
}

function Question({data, nextSection}){
  const [showResults, setShowResults] = useState(false)
  const [ optionAnsCount, setOptionAnsCount ] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    "all": 0
  })
  let { sock } = useContext(MainContext)

  const qnsTimer = 1;

  const {
    seconds,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ qnsTimer, onExpire: () => finishTimer() });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + qnsTimer); // 10 minutes timer
    restart(time)

    console.log(data)
  }, [data])

  useEffect(() => {
    if(sock){
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
  }, [sock])


  function finishTimer(){
    setShowResults(true)
    sock.emit("show-results", "")
  }


  function returnCorrect(ind){
    if(showResults){
      return (data.correct == ind)? <CheckIcon/> : <CloseIcon/>
    }else{ return; }
  }


  return (
    <>
      <Stack>
        <Center h="15vh">
          <Heading>{data.qns}</Heading>
        </Center>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3} p={3} h="70vh">
          <GridItem bg={"red.500"} textAlign={"center"} textColor={"white"}>
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"}>
                {returnCorrect(0)}
                <Text>{data.options[0]}</Text>
                {showResults && <Text>{optionAnsCount[0]} chose this</Text>}
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"blue.500"} textAlign={"center"} textColor={"white"}>
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"}>
                {returnCorrect(1)}
                <Text>{data.options[1]}</Text>
                {showResults && <Text>{optionAnsCount[1]} chose this</Text>}
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"green.500"} textAlign={"center"} textColor={"white"}>
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"}>
                {returnCorrect(2)}
                <Text>{data.options[2]}</Text>
                {showResults && <Text>{optionAnsCount[2]} chose this</Text>}
              </Stack>
            </Center>
          </GridItem>
          <GridItem bg={"yellow.500"} textAlign={"center"} textColor={"white"}>
            <Center h="100%">
              <Stack fontSize={"3vw"} alignItems={"center"}>
                {returnCorrect(3)}
                <Text>{data.options[3]}</Text>
                {showResults && <Text>{optionAnsCount[3]} chose this</Text>}
              </Stack>
            </Center>
          </GridItem>
        </Grid>
        <Stack h="5vh" direction={"row"} px={5} justifyContent={"space-between"}>
          <Heading>{seconds} seconds left</Heading>
          <Heading>{optionAnsCount["all"]} Answered</Heading>
          {showResults && <Button onClick={() => {
            setShowResults(false)
            nextSection("scoreboard")
          }}>
              Show Results
            </Button>}
        </Stack>
      </Stack>
    </>
  )
}

// host view to show qns and answers
function Quiz(){
  // at 0, is at start quiz button
  // const [quizProgress, setQuizProgress] = useState(0)
  const [currentQns, setCurrentQns] = useState()  // holds current component to show

  let { currentPhase, sock, nextPhase } = useContext(MainContext)
  let { quizData, quizProgress, nextQuizProgress } = useContext(QuizContext)

  useEffect(() => {
    console.log(quizData)
    if(sock == undefined) setCurrentQns(<Spinner/>)

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
      // let q = quizProgress
      // setQuizProgress(q + 1)
      nextQuizProgress()
      // console.log(quizProgress)
      // sock.emit("show-question", quizProgress)
    }else if(page == "scoreboard"){
      console.log("going to scoreboard...")
      // sock.emit("get-scoreboard", "")   // trigger to show scoreboard also for the rest
      setCurrentQns(<AllClassScoreboard nextSection={nextSection}/>)
    }
    
  }

  return(
    <>
      {currentQns} 
    </>
  )
}

export default function QuizWrapper(){
  return (
    <QuizContextProvider>
      <Quiz/>
    </QuizContextProvider>
  )
}
