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
import { armouryImgList } from "../data/data";
import { useState, useEffect } from "react";

export function ArmouryItems({ item, description, emeralds }) {
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
        <Center>
          <Image src={`img/itemLog/${item}.png`} alt={"item image"} />{" "}
        </Center>
      </Text>
      <Text fontSize="3xl" fontWeight={"bold"}>
        {item}
      </Text>
      <Text fontSize="xl">{description == "nil" ? "" : description}</Text>

      <Center>
        <HStack p={3} borderRadius={20} boxShadow={"lg"}>
          <Text fontSize={"xl"}>{emeralds}</Text>
          <Image src="/icons/emerald.png" w={"2vh"} alt={"emerald image"} />
        </HStack>
      </Center>
    </Stack>
  );
}

export function Armoury({ nextSection, standAlone = false }) {
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    // Set the current category when the component mounts
    setCurrentCategory(null);
  }, []);

  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
         Armoury
      </Heading>
      {Object.keys(armouryImgList).map(
        (categoryName) =>
          currentCategory !== categoryName && (
            <div key={categoryName}>
              <Text fontSize="4xl" textAlign={"left"} ml={10} mt={10}>
                {categoryName}
              </Text>
              <Grid
                key={categoryName}
                templateColumns={"repeat(4, 2fr)"}
                p={5}
                minH="30vh"
                w="100%"
                fontSize={"1.2em"}
              >
                {Object.keys(armouryImgList[categoryName]).map((item) => (
                  <GridItem key={item}>
                    <ArmouryItems
                      item={item}
                      description={
                        armouryImgList[categoryName][item].description
                      }
                      emeralds={armouryImgList[categoryName][item].emeralds}
                    />
                  </GridItem>
                ))}
              </Grid>
            </div>
          )
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
  );
}

// Displayed for Student View
export function StandAloneArmoury() {
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    // Set the current category when the component mounts
    setCurrentCategory(null);
  }, []);

  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
        The Armoury
      </Heading>
      {Object.keys(armouryImgList).map(
        (categoryName) =>
          currentCategory !== categoryName && (
            <div key={categoryName}>
              <Text fontSize="4xl" textAlign={"left"} ml={10} mt={10}>
                {categoryName}
              </Text>
              <Grid
                key={categoryName}
                templateColumns={"repeat(4, 2fr)"}
                p={5}
                minH="30vh"
                w="100%"
                fontSize={"1.2em"}
              >
                {Object.keys(armouryImgList[categoryName]).map((item) => (
                  <GridItem key={item}>
                    <ArmouryItems
                      item={item}
                      description={
                        armouryImgList[categoryName][item].description
                      }
                      emeralds={armouryImgList[categoryName][item].emeralds}
                    />
                  </GridItem>
                ))}
              </Grid>
            </div>
          )
      )}
    </Stack>
  );
}
