import { useContext, useEffect, useState } from "react"
import { MainContext } from "../context/MainContext"
import { UserContext } from "../context/UserContext"
import { Center, Grid, GridItem, Heading, Spinner, Stack, Table, TableCaption, Tbody, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { ClassScoreboard } from "./scoreboard"
import QuizContextProvider, { QuizContext } from "../context/QuizContext"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

// studs view to select answers
function QuizOptions(){
  let { sock } = useContext(MainContext)
  let { user, setEmeralds } = useContext(UserContext)
  let { quizProgress, storeQuizProgress } = useContext(QuizContext)

  const [ componentToShow, setComponentToShow ] = useState(<>
    <Center h="90vh">
      <Heading>Quiz Time!</Heading>
    </Center>
  </>)
  // const [ ans, setAns ] = useState()    // hold current ans value with user data
  // const [ ansResult, setAnsResult ] = useState(false)   // hold result of answering qns
  let qp = 0;   // have to use this because next context is incompetent as fuck
  let ansResult = {}
  let ans = {}


  useEffect(() => {
    console.log(quizProgress, qp)
    if(quizProgress > qp) qp = quizProgress
  },[quizProgress])
  

  function answerQuestion(a){
    // studentChoseAnswer(a)
    // setAnsweredBool(true)
    ans = user;
    console.log(quizProgress)
    if (qp > quizProgress)ans['qns_num'] = qp
    else ans['qns_num'] = quizProgress
    ans['ans'] = a
    
    sock.emit("stud-answer", ans)

    setComponentToShow(<>
      <Center h="90vh">
        <Stack alignItems={"center"} textAlign={"center"}>
          <Heading>You answered!</Heading>
          <Text>Waiting for host...</Text>
          <Spinner mr={3} speed="0.6s" size={"lg"} thickness="6px"/>
        </Stack>
      </Center>
    </>)
  }

  useEffect(() => {
    if(sock){
      sock.on("show-question", (data) => {
        qp = data
        storeQuizProgress(data)   // updates quiz progress and shows qns options
        setComponentToShow(<>
          <Grid templateColumns={"repeat(2, 1fr)"} gap={3} p={3} h="90vh">
            <GridItem bg={"red.500"} textAlign={"center"} textColor={"white"}
              onClick={() => {
                answerQuestion(0)
              }}
            >
            </GridItem>
            <GridItem bg={"blue.500"} textAlign={"center"} textColor={"white"}
              onClick={() => {
                answerQuestion(1)
              }}
            >
            </GridItem>
            <GridItem bg={"green.500"} textAlign={"center"} textColor={"white"}
              onClick={() => {
                answerQuestion(2)
              }}
            >
            </GridItem>
            <GridItem bg={"yellow.500"} textAlign={"center"} textColor={"white"}
              onClick={() => {
                answerQuestion(3)
              }}
            >
            </GridItem>
          </Grid>
        </>)
      })
      sock.on("stud-result", (data) => {
        console.log("result", data)
        ansResult = data;
      })
      sock.on("show-results", (data) => {
        if(ansResult.emeraldsNow) setEmeralds(ansResult.emeraldsNow)
        setComponentToShow(<>
          <Center h="90vh" textAlign={"center"}>
            <Stack alignItems={"center"}>
              {(ansResult.result)? <CheckIcon boxSize={"10vw"}/> : <CloseIcon boxSize={"10vw"} />}
              <Heading>{(ansResult.result)?"CORRECT":"WRONG"}</Heading>
              {/* <Text size={"3vw"}>You answered {(ansResult.result)?"right!":"wrong"}</Text> */}
              <Text size={"5vw"}>You got {(ansResult.result)?ansResult.emeraldsAdded:"0"} emeralds</Text>
            </Stack>
          </Center>
        </>)

      })
      sock.on("get-scoreboard", (data) => {
        // console.log(data)
        let classScoreboard = data[user.class]
        setComponentToShow(<Center h="90vh" fontSize={"2em"}>
            <ClassScoreboard scoreboard={classScoreboard.scoreboard} values={classScoreboard.values} showUserStanding={true}/>
         </Center>
        )
      })
    }
  }, [sock])



  return (
    <>
      {componentToShow}
      {/* {showScoreboard(['bruh', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'kw', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'], {kw: 200, bruh:0, a: 100, b: 200, c: 300, d: 400, e: 500, f: 600, g: 700, h: 800, i: 900, j: 1000, k: 1100, l: 1200, m:1300, n:1400, o:1500, p:1600, q:1700, r:1800})} */}
    </>
  )
}

export default function QuizOptionsWrapper(){
  return (
    <QuizContextProvider>
      <QuizOptions/>
    </QuizContextProvider>
  )
}