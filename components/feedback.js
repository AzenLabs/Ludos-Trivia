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

export function Feedback() {
  return (
    <Stack
      gap={4}
      textAlign={"center"}
      background={"#311955"}
      borderRadius={10}
      px={5}
      py={3}
      m={5}
      h={"100vh"}
      minW={["70vw", "auto"]}
    >
      <Text fontSize="3xl" fontWeight={"bold"}>
        Certification Quiz + Feedback
      </Text>
      <Center>
        <Image boxSize={"60vh"} src={`img/qr-code.png`} alt={"item image"} />
      </Center>
      <Text fontSize="3xl" fontWeight={"bold"}>
        Thank you!
      </Text>
    </Stack>
  );
}
