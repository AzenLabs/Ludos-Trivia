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
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { armouryImgList } from "../data/data";
import { useState, useEffect, useCallback } from "react";

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

export function ArmouryItemsRow({ item, description, emeralds, onClick }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleItemClick = () => {
    setIsSelected(!isSelected); // Toggle the selection state
    onClick(emeralds, item);
  };

  return (
    <Grid
      onClick={() => handleItemClick()} // Call the onClick handler when clicked
      background={isSelected ? "#FFD700" : "#311955"} // Apply grey overlay if selected
      h="120px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
      borderRadius={10}
      px={5}
      py={2}
      minW={["70vw", "auto"]}
    >
      <GridItem rowSpan={2} colSpan={2}>
        <Center objectFit={"contain"}>
          <Image
            boxSize="100px"
            src={`img/itemLog/${item}.png`}
            alt={"item image"}
          />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Text
          color={isSelected ? "#292929" : "#FFFFFF"}
          fontSize="xl"
          fontWeight={"bold"}
        >
          {item}
        </Text>
      </GridItem>
      <GridItem colSpan={1} rowSpan={2}>
        <Center>
          <Text color={isSelected ? "#292929" : "#FFFFFF"} fontSize={"lg"}>
            {emeralds}
          </Text>
          <Image src="/icons/emerald.png" w={"2vh"} alt={"emerald image"} />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Text color={isSelected ? "#292929" : "#FFFFFF"} fontSize="sm">
          {description == "nil" ? "" : description}
        </Text>
      </GridItem>
    </Grid>
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
              <Text fontSize="4xl" textAlign={"left"} ml={10} mt={10} mb={3}>
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
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState({}); // Keep track of selected items

  useEffect(() => {
    // Set the current category when the component mounts
    setCurrentCategory(null);
  }, []);
  const handleItemClick = useCallback(
    (emeralds, item) => {
      console.log(selectedItems);
      // Check if the item is already selected
      if (selectedItems[item]) {
        // If selected, subtract the emeralds
        setTotal((prevTotal) => prevTotal - emeralds);
        setSelectedItems((prevSelectedItems) => {
          const updatedSelectedItems = { ...prevSelectedItems };
          delete updatedSelectedItems[item];
          return updatedSelectedItems;
        });
      } else {
        // If not selected, add the emeralds
        setTotal((prevTotal) => prevTotal + emeralds);
        setSelectedItems((prevSelectedItems) => ({
          ...prevSelectedItems,
          [item]: true,
        }));
      }
    },
    [selectedItems]
  );

  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
        Armoury
      </Heading>
      {Object.keys(armouryImgList).map(
        (categoryName) =>
          currentCategory !== categoryName && (
            <div key={categoryName}>
              <Text fontSize="2xl" textAlign={"left"} ml={5} mt={5} mb={3}>
                {categoryName}
              </Text>
              <SimpleGrid
                key={categoryName}
                columns={1}
                spacing={6}
                mr={5}
                ml={5}
                fontSize={"1.2em"}
              >
                {Object.keys(armouryImgList[categoryName]).map((item) => (
                  <GridItem key={item}>
                    <ArmouryItemsRow
                      item={item}
                      description={
                        armouryImgList[categoryName][item].description
                      }
                      emeralds={armouryImgList[categoryName][item].emeralds}
                      onClick={handleItemClick} // Pass the click handler
                    />
                  </GridItem>
                ))}
              </SimpleGrid>
            </div>
          )
      )}
      <Flex
        direction="column"
        align="center"
        justify="flex-end"
        pos="fixed"
        bottom="15vh"
        left="0"
        right="0"
      >
        <HStack bg="#412272" p={3} borderRadius={20} boxShadow="lg">
          {/* Your content here */}
          <Text fontSize={"xl"}>Checkout | {total}</Text>
          <Image src="/icons/emerald.png" w={"4vw"} />
        </HStack>
      </Flex>
    </Stack>
  );
}
