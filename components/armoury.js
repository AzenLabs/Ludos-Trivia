import {
  Button,
  Center,
  Grid,
  GridItem,
  Box,
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
  VStack,
} from "@chakra-ui/react";
import { armouryImgList } from "../data/data";
import { useState, useEffect, useCallback, useContext } from "react";
import { MainContext } from "../context/MainContext";
import { UserContext } from "../context/UserContext";
import { setScoreboardClassWinnerData } from "./scoreboard_functions";

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

function ArmouryItemsRow({ item, description, emeralds, onClick }) {
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
  let { user, emeralds, setEmeralds } = useContext(UserContext);
  const [teamEmeralds, setTeamEmeralds] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCheckoutConfirmation = () => {
    setShowConfirmationModal(false);
    checkout();
  };

  useEffect(() => {
    setCurrentCategory(null);
  }, []);

  useEffect(() => {
    if (sock) {
      // Set the current category when the component mounts
      sock.emit("get-scoreboard", "");
      sock.on("get-scoreboard", (data) => {
        for (const className in data) {
          if (data.hasOwnProperty(className) && className === user.class) {
            setTeamEmeralds(data[className].store);
          }
        }
        // Return null or a default value if the class is not found
      });
    }
  }, [sock, user.class]);

  const checkout = () => {
    sock.emit("submit-armoury-choice", {
      selectedItems: Object.keys(selectedItems),
      total: total,
      user: user,
    });

    sock.on("submit-armoury-choice", (data) => {
      if (data == "Not enough emeralds!") onOpen();
      else if (data == "Done") setCheckoutDone(true);
    });

    return () => {
      sock.off("submit-armoury-choice", (data) => {
        if (data == "Not enough emeralds!") onOpen();
      });
    };
  };

  const handleItemClick = useCallback(
    (emeralds, item) => {
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
      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Checkout Confirmed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* You can customize the confirmation message here */}
            Confirm Checkout?
          </ModalBody>
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              colorScheme="red"
              onClick={() => setShowConfirmationModal(false)}
            >
              No
            </Button>
            <Button
              mr={10}
              colorScheme="blue"
              onClick={handleCheckoutConfirmation}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {checkoutDone ? (
        <Center h="90vh">
          <Stack alignItems={"center"} textAlign={"center"}>
            <Heading>You&apos;ve checked out!</Heading>
            <Text>Waiting for host...</Text>
            <Spinner mr={3} speed="0.6s" size={"lg"} thickness="6px" />
          </Stack>
        </Center>
      ) : (
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
              onClick={() => setShowConfirmationModal(true)} // Pass the click handler
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
          <HStack
            bg="#412272"
            pos="fixed"
            p={3}
            borderRadius={20}
            left={"5vw"}
            boxShadow={"lg"}
            bottom={"3vh"}
          >
            <Stack>
              <Center>
                <Text fontSize={"xl"}>Team</Text>
              </Center>
              <HStack>
                <Text fontSize={"xl"}>{teamEmeralds}</Text>
                <Image src="/icons/emerald.png" w={"4vw"} />
              </HStack>
            </Stack>
          </HStack>
        </Stack>
      )}
    </>
  );
}

function ReviewTop4StudentPurchasesItem({ name, className, selectedItems }) {
  const [needs, setNeeds] = useState([]);
  const [wants, setWants] = useState([]);

  function getItemByName(itemName) {
    for (const category in armouryImgList) {
      if (armouryImgList.hasOwnProperty(category)) {
        const categoryItems = armouryImgList[category];
        if (categoryItems.hasOwnProperty(itemName)) {
          return categoryItems[itemName];
        }
      }
    }
    // Return null if the item is not found
    return null;
  }

  useEffect(() => {
    function organiseNeedsWants(selectedItems) {
      const studentNeeds = [];
      const studentWants = [];

      selectedItems.forEach((item) => {
        const itemData = getItemByName(item);
        if (itemData.status === "Need") studentNeeds.push(item);
        else if (itemData.status === "Want") studentWants.push(item);
      });
      setNeeds(studentNeeds);
      setWants(studentWants);
    }

    // Call the function to organize the items when the component is rendered
    organiseNeedsWants(selectedItems);
  }, [selectedItems]);

  return (
    <Grid
      background={"#311955"} // Apply grey overlay if selected
      templateColumns="repeat(5, 1fr)"
      gap={2}
      borderRadius={10}
      px={5}
      py={2}
      minW={["70vw", "auto"]}
      minHeight={"100%"}
    >
      <GridItem rowSpan={2} colSpan={1}>
        <Center h="100%">
          <VStack>
            <Text fontSize="xl" fontWeight={"bold"}>
              {name}
            </Text>
            <Text fontSize="xl" fontWeight={"bold"}>
              {className}
            </Text>
          </VStack>
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <VStack>
          <Text fontSize="xl" fontWeight={"bold"}>
            Needs
          </Text>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={4}
            bg={"#412272"}
            px={3}
            borderRadius={10}
            py={1}
          >
            {needs.map((item, index) => (
              <div key={index}>
                <GridItem colSpan={1} p={4}>
                  <Center objectFit={"contain"}>
                    <Image
                      boxSize="80px"
                      src={`img/itemLog/${item}.png`}
                      alt={"item image"}
                    />
                    <Text ml={3}>{item}</Text>
                  </Center>
                </GridItem>
              </div>
            ))}
          </Grid>
        </VStack>
      </GridItem>
      <GridItem colSpan={2}>
        <VStack>
          <Text fontSize="xl" fontWeight={"bold"}>
            Wants
          </Text>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={4}
            bg={"#412272"}
            px={3}
            borderRadius={10}
            py={1}
          >
            {wants.map((item, index) => (
              <div key={index}>
                <GridItem colSpan={1} p={4}>
                  <Center objectFit={"contain"}>
                    <Image
                      boxSize="80px"
                      src={`img/itemLog/${item}.png`}
                      alt={"item image"}
                    />
                    <Text ml={3}>{item}</Text>
                  </Center>
                </GridItem>
              </div>
            ))}
          </Grid>
        </VStack>
      </GridItem>
    </Grid>
  );
}

// Presenter view
export function ReviewTop4StudentPurchases({
  nextSection,
  standAlone = false,
}) {
  let { sock } = useContext(MainContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState({});
  let { user, setEmeralds } = useContext(UserContext);

  function findTopStudents(data) {
    const topStudents = {};

    for (const className in data) {
      if (data.hasOwnProperty(className)) {
        const classData = data[className].values;

        // Find the student with the most emeralds
        let topStudent = null;
        let topEmeralds = -1;

        for (const studentName in classData) {
          if (classData.hasOwnProperty(studentName)) {
            const emeralds = classData[studentName].emeralds;

            if (emeralds > topEmeralds) {
              topEmeralds = emeralds;
              topStudent = studentName;
            }
          }
        }

        // Save the top student to the result
        topStudents[className] = {
          [topStudent]: classData[topStudent],
        };
      }
    }

    return topStudents;
  }

  function addArmouryToStudents(classScoreboard, armouryData) {
    // Loop through the classScoreboard object
    for (const className in classScoreboard) {
      if (classScoreboard.hasOwnProperty(className)) {
        const studentObj = classScoreboard[className];

        // Loop through the students in the current className
        for (const studentName in studentObj) {
          if (studentObj.hasOwnProperty(studentName)) {
            // Check if the student exists in the armouryData object
            if (
              armouryData.hasOwnProperty(className) &&
              armouryData[className].hasOwnProperty(studentName)
            ) {
              // Add the "armoury" property to the student's object
              studentObj[studentName].armoury =
                armouryData[className][studentName].armoury;
            }
          }
        }
      }
    }

    return classScoreboard;
  }

  useEffect(() => {
    if (sock) {
      sock.emit("get-scoreboard", "");

      sock.on("get-scoreboard", (data) => {
        const winnerData = setScoreboardClassWinnerData(data);
        console.log("winner data is: ");
        console.log(winnerData);
        const topStudents = findTopStudents(data);
        setData(topStudents);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        sock.off("get-scoreboard");
      };
    }
  }, [sock]);

  return (
    <Stack pb={10}>
      <Heading textAlign={"center"} mt={10}>
        Top 4 Students&apos; Purchases
      </Heading>
      {Object.keys(data).map((className) => (
        <SimpleGrid
          key={className}
          columns={1}
          spacing={6}
          mr={5}
          ml={5}
          fontSize={"1.2em"}
        >
          {Object.keys(data[className]).map((studentName) => (
            <GridItem rowSpan={1} colSpan={1} key={studentName}>
              {data[className]?.[studentName]?.armoury ? (
                <ReviewTop4StudentPurchasesItem
                  name={studentName}
                  className={className}
                  selectedItems={data[className][studentName].armoury}
                />
              ) : (
                ""
              )}
            </GridItem>
          ))}
        </SimpleGrid>
      ))}

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
