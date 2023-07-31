import { Button, Center, Grid, GridItem, Heading, Stack, Table, TableCaption, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MainContext } from "../context/MainContext";

export function ClassScoreboard({scoreboard, values, showUserStanding, classToShow}){
  const { user } = useContext(UserContext)
  const [ finalScoreboard, setFinalScoreboard ] = useState([])

  useEffect(() => {
    if(showUserStanding){
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
      setFinalScoreboard(scoreboardSub)
    }else{
      let scoreboardSub = scoreboard.slice(0, 5)
      setFinalScoreboard(scoreboardSub)
    }
  }, [])
  

  return (
    
      <Stack gap={5}>
        <Heading alignSelf={"center"} fontSize={"inherit"}>{(showUserStanding)?user.class:classToShow} Class Scoreboard</Heading>
        <Table colorScheme='teal' maxW="60vw" my="auto" border={"2px solid lightgrey"}>
          <Thead>
            <Tr>
              <Th>Standing</Th>
              <Th>Student</Th>
              <Th>Emeralds</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              finalScoreboard && finalScoreboard.map((stud) => (
                <Tr backgroundColor={(showUserStanding && stud == user.username)?"lightblue": ""}>
                  <Th>{scoreboard.indexOf(stud) + 1}</Th>
                  <Th>{stud}</Th>
                  <Th>{values[stud]}</Th>
                </Tr>
              ))
            }
          </Tbody>
          {showUserStanding && (
            <TableCaption>
              <Text fontWeight={"bold"} fontSize={"2vw"}>You are in #{finalScoreboard.indexOf(user.username) + 1} place!</Text>
            </TableCaption>
          )}
          
        </Table>
      </Stack>
      
    
  )
}

export function AllClassScoreboard({nextSection}){
  const { sock } = useContext(MainContext)
  const [ scoreboardData, setScoreboardData ] = useState()

  useEffect(() => {
    if(sock){
      sock.emit("get-scoreboard", "")

      sock.on("get-scoreboard", (data) => {
        console.log(data)
        setScoreboardData(data)
      })
    }
  }, [sock])

  return(
    <>
      <Stack direction={"row"} justifyContent={"center"} gap={20}>
        <Heading textAlign={"center"} mt={5}>Scoreboard</Heading>
        <Center>
          <Button
            onClick={() => nextSection("question")}
          >Next Question</Button>
        </Center>
        
      </Stack>
      
      {scoreboardData && (
      <Grid templateColumns={"repeat(4, 2fr)"} gap={10} p={5} h="90vh" w="100%" fontSize={"1.2em"}>
        {Object.keys(scoreboardData).map(key => (
          <GridItem >
            <ClassScoreboard key={key} scoreboard={scoreboardData[key].scoreboard}
              values={scoreboardData[key].values} showUserStanding={false} classToShow={key}
            />
          </GridItem>
        ))}
      </Grid>
      )}
      
    </>
  )
}