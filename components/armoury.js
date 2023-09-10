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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { armouryImgList } from "../data/data";
import { useState, useEffect, useCallback, useContext } from "react";
import { MainContext } from "../context/MainContext";
import { UserContext } from "../context/UserContext";

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

export function NoEmeraldModal(setOpenModal) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    // Automatically open the modal when the component mounts
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    // Automatically open the modal when the component mounts
    setOpenModal(false);
  }, [onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Not enough emeralds</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* Your content goes here */}
            You do not have enough emeralds.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Okay!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
  let { sock } = useContext(MainContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState({}); // Keep track of selected items
  let { user, setEmeralds } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Set the current category when the component mounts
    setCurrentCategory(null);
  }, []);

  const checkout = () => {
    console.log("checking out armoury");
    console.log(selectedItems);
    sock.emit("submit-armoury-choice", {
      selectedItems: selectedItems,
      total: total,
      user: user
    });

    // Add an event listener for "get-team-scoreboard" event
    sock.on("submit-armoury-choice", (data) => {
      console.log("setting open modal");
      if (data == "Not enough emeralds!") onOpen();
    });

    return () => {
      sock.off("submit-armoury-choice", (data) => {
        if (data == "Not enough emeralds!") onOpen();
      });
    };
  };

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
    <>
      <Stack pb={200}>
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Not enough emeralds</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {/* Your content goes here */}
              You do not have enough emeralds.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Okay!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex
          direction="column"
          align="center"
          justify="flex-end"
          pos="fixed"
          bottom="15vh"
          left="0"
          right="0"
        >
          <HStack
            onClick={checkout} // Pass the click handler
            bg="#412272"
            p={3}
            borderRadius={20}
            boxShadow="lg"
          >
            {/* Your content here */}
            <Text fontSize={"xl"}>Checkout | {total}</Text>
            <Image src="/icons/emerald.png" w={"4vw"} />
          </HStack>
        </Flex>
      </Stack>
    </>
  );
}
