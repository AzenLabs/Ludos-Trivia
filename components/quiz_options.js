import { useContext, useEffect, useState } from "react"
import { MainContext } from "../context/MainContext"
import { UserContext } from "../context/UserContext"
import { Center, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react"

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

  return (
    <>
      {componentToShow}
    </>
  )
}