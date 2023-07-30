// leave this component out for MVP first

import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { Card, CardBody, Center, Heading, Stack, Text, useStatStyles } from "@chakra-ui/react";
import reactStringReplace from 'react-string-replace';

export default function FillBlanks(){
  const { blanksData, currentPhase } = useContext(MainContext)
  const [ passage, setPassage ] = useState()

  useEffect(() => {
    if(blanksData){
      let t = blanksData[3].text
      let replaced = reactStringReplace(t, "<>", (match, i) => (
        <Heading>lmao</Heading>
      ))
      console.log(replaced)
    }
  }, [blanksData])

  return (
    <>
    <Stack gap={"3vh"} alignItems={"center"} my={5}>
      <Heading>Fill in the blanks</Heading>
      <Card w="80vw" variant={"filled"}>
        <CardBody>
          <Text>
            {blanksData[3].text}
          </Text>
        </CardBody>
      </Card>
    </Stack>
    </>
    
  )
}