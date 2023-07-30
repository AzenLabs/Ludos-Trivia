import { useContext, useEffect, useState } from "react"
import { MainContext } from "../context/MainContext"
import { UserContext } from "../context/UserContext"
import { Center, Grid, GridItem, Heading, Stack, Table, TableCaption, Tbody, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"

// studs view to select answers
export default function QuizOptions(){
  let { sock } = useContext(MainContext)
  let { user, setEmeralds } = useContext(UserContext)

  const [ quizProgress, setQuizProgress ] = useState(1)

  const [ answered, setAnswered ] = useState(-1)
  const [ componentToShow, setComponentToShow ] = useState(<>
    <Center h="90vh">
      <Heading>Quiz Time!</Heading>
    </Center>
  </>)
  const [ ans, setAns ] = useState()
  const [ ansResult, setAnsResult ] = useState(false)


  useEffect(() => {
    if(sock){
      sock.on("show-question", (data) => {
        setQuizProgress(data)
        setAnswered(0)
      })
      sock.on("stud-result", (data) => {
        console.log("result", data)
        setAnsResult(data)
      })
      sock.on("show-results", (data) => {
        console.log(ansResult)
        setEmeralds(ansResult.emeraldsNow)
        setComponentToShow(<>
          <Center h="90vh">
            <Stack>
              <Heading>Results</Heading>
              <Text size={"3vw"}>You answered {(ansResult.result)?"right!":"wrong :("}</Text>
              <Text size={"3vw"}>You got {ansResult.emeraldsAdded} emeralds</Text>
            </Stack>
          </Center>
        </>)

        sock.on("get-scoreboard", (data) => {
          console.log(data)
          let classScoreboard = data[user.class]
          setComponentToShow(showScoreboard(classScoreboard.scoreboard, classScoreboard.values))
        })
      })
    }
  }, [sock, ansResult])

  useEffect(() => {
    console.log(quizProgress)
    let _ans = user
    _ans["qns_num"] = quizProgress
    setAns(_ans)
  }, [user, quizProgress])

  useEffect(() => {
    if(answered === 1){
      setComponentToShow(<>
        <Center h="90vh">
          <Heading>You answered! Waiting for host..</Heading>
        </Center>
      </>)
    }else if (answered === 0){
      setComponentToShow(<>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3} p={3} h="90vh">
          <GridItem bg={"red.500"} textAlign={"center"} textColor={"white"}
            onClick={() => {
              // let ans = user
              // console.log(currentQnsIndex)
              // ans["qns_num"] = currentQnsIndex
              let _ans = ans
              _ans["ans"] = 0
              sock.emit("stud-answer", _ans)
              setAnswered(1)
            }}
          >
          </GridItem>
          <GridItem bg={"blue.500"} textAlign={"center"} textColor={"white"}
            onClick={() => {
              // let ans = user
              // console.log(currentQnsIndex)
              // ans["qns_num"] = currentQnsIndex
              let _ans = ans
              _ans["ans"] = 1
              sock.emit("stud-answer", _ans)
              setAnswered(1)
            }}
          >
          </GridItem>
          <GridItem bg={"green.500"} textAlign={"center"} textColor={"white"}
            onClick={() => {
              // let ans = user
              // console.log(currentQnsIndex)
              // ans["qns_num"] = currentQnsIndex
              let _ans = ans
              _ans["ans"] = 2
              sock.emit("stud-answer", _ans)
              setAnswered(1)
            }}
          >
          </GridItem>
          <GridItem bg={"yellow.500"} textAlign={"center"} textColor={"white"}
            onClick={() => {
              // let ans = user
              // console.log(currentQnsIndex)
              // ans["qns_num"] = currentQnsIndex
              let _ans = ans
              _ans["ans"] = 3
              sock.emit("stud-answer", _ans)
              setAnswered(1)
            }}
          >
          </GridItem>
        </Grid>
      </>)  
    }
  }, [answered])

  function showScoreboard(scoreboard, values){
    // get list of 8 studs to show in scoreboard max
    let myStanding = scoreboard.indexOf(user.username)
    let scoreboardSub;  // only include 10 studs in scoreboard
    if(myStanding < 10){
      scoreboardSub = scoreboard.slice(0, 10)
    }else if(myStanding > (scoreboard.length - 10)){
      scoreboardSub = scoreboard.slice(scoreboard.length - 10, scoreboard.length + 1)
    }else{
      scoreboardSub = scoreboard.slice(myStanding - 4, myStanding + 6)
    }

    return (
      <Center h="90vh">
        <Stack gap={5}>
          <Heading alignSelf={"center"} >{user.class} Class Scoreboard</Heading>
          <Table colorScheme='teal' w="60vw" my="auto" border={"2px solid lightgrey"}>
            <Thead>
              <Tr>
                <Th>Standing</Th>
                <Th>Student</Th>
                <Th>Emeralds</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                scoreboardSub && scoreboardSub.map((stud) => (
                  <Tr backgroundColor={(stud == user.username)?"lightblue": ""}>
                    <Th>{scoreboard.indexOf(stud) + 1}</Th>
                    <Th>{stud}</Th>
                    <Th>{values[stud]}</Th>
                  </Tr>
                ))
              }
            </Tbody>
            <TableCaption>
              <Text fontWeight={"bold"} fontSize={"2vw"}>You are in #{myStanding + 1} place!</Text>
            </TableCaption>
          </Table>
        </Stack>
        
      </Center>
      
    )
  }

  return (
    <>
      {componentToShow}
      {/* {showScoreboard(['bruh', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'kw', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'], {kw: 200, bruh:0, a: 100, b: 200, c: 300, d: 400, e: 500, f: 600, g: 700, h: 800, i: 900, j: 1000, k: 1100, l: 1200, m:1300, n:1400, o:1500, p:1600, q:1700, r:1800})} */}
    </>
  )
}