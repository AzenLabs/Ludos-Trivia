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

export function ArmouryItems({ itemName }) {
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
          <Image src={`img/itemLog/${itemName}.png`} alt={"item image"} />{" "}
        </Center>
      </Text>

      <Center>
        <HStack p={3} borderRadius={20} boxShadow={"lg"}>
          <Text fontSize={"xl"}>{itemName}</Text>
          <Image src="/icons/emerald.png" w={"2vh"} alt={"emerald image"} />
        </HStack>
      </Center>
    </Stack>
  );
}

export function Armoury({ nextSection, standAlone = false }) {
  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
        The Armoury
      </Heading>

      <Grid
        templateColumns={"repeat(4, 2fr)"}
        p={5}
        minH="30vh"
        w="100%"
        fontSize={"1.2em"}
      >
        {armouryImgList.map((item, index) => (
          <GridItem key={index}>
            <ArmouryItems itemName={item} />
          </GridItem>
        ))}
      </Grid>
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
