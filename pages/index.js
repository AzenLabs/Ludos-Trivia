import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import FormLayout from "../components/form_layout";
import {
  Select,
  Button,
  InputRightElement,
  Box,
  Card,
  CardBody,
  Center,
  CardHeader,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Stack,
  Grid,
  GridItem,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Toast,
  useToast,
  Fade,
  ScaleFade,
  Link,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
import { BiLogIn, BiSolidBook } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { UserContext } from "../context/UserContext";
import { postData } from "../components/base_fetchers";
import { useRouter } from "next/router";


const Home = () => {
  let { user, storeUser } = useContext(UserContext)
  const toast = useToast()
  let router = useRouter()

  return (
    <>
      
        <Box
          w="100%"
          h={['100vh', '95vh']}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <Center>
            <ScaleFade initialScale={0.5} in={true}>
              <Card w={['80vw', '80vw', '40vw']} bg="#FFC63C" color="#36294D">
                <CardHeader textAlign="center">
                  <Heading >Join Room</Heading>
                </CardHeader>
                <CardBody>
                  <Formik
                    initialValues={{
                      username: "",
                      email: '',
                      class: ""
                    }}
                    onSubmit={async (values, actions) => {
                      setTimeout(async () => {
                        // alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(true)

                        let userData = {
                          "username": values.username,
                          "email": values.email,
                          "class": values.class
                        }

                        let resp = await postData("/api/auth", userData)

                        console.log(resp)
                        if (resp.status !== 200) {
                          toast({
                            title: 'Error!',
                            description: resp.error,
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                          })
                          actions.setSubmitting(false)
                        } else {
                          toast({
                            title: 'Success!',
                            description: 'Joining Room',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                          })
                          storeUser(userData)
                          // console.log('Redirect')
                          router.push('/room')
                        }
                      }, 400)
                    }}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <Stack spacing={4} px={3} alignItems={"center"}>
                        <Field name="username">
                            {({ field, form }) => (
                              <FormControl isRequired>
                                <InputGroup>
                                  <Input
                                    {...field}
                                    placeholder="Name (Max 8 Characters)"
                                    variant="filled"
                                    type="text"
                                    bg="#FFD777"
                                    borderRadius={20}
                                  />
                                </InputGroup>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="email">
                            {({ field, form }) => (
                              <FormControl isRequired>
                                <InputGroup>
                                  <Input
                                    {...field}
                                    placeholder="Email"
                                    variant="filled"
                                    type="email"
                                    bg="#FFD777"
                                    borderRadius={20}
                                  />
                                </InputGroup>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="class">
                            {({ field, form }) => (
                              <FormControl isRequired>
                                <Select 
                                {...field}
                                placeholder='Class' variant={"filled"}
                                bg="#FFD777"
                                borderRadius={20}
                                >
                                  <option value="3 Empathy">3 Empathy</option>
                                  <option value="3 Honour">3 Honour</option>
                                  <option value="3 Diligence">3 Diligence</option>
                                  <option value="3 Resilience">3 Resilience</option>
                                  <option value="3 Integrity">3 Integrity</option>
                                  <option value="3 Harmony">3 Harmony</option>
                                  <option value="3 Respect">3 Respect</option>
                                  <option value="3 Kindness">3 Kindness</option>
                                </Select>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            w={"50%"}
                            my={5}
                            variant="solid"
                            bg="#EB7DFF"
                            color={"white"}
                            // leftIcon={<Icon as={BiLogIn} />}
                            isLoading={props.isSubmitting}
                            type="submit"
                            borderRadius={20}
                            boxShadow={"lg"}
                          >
                            Let&apos;s go!
                          </Button>

                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </ScaleFade>
          </Center>
        </Box>
    </>
  );
};

export default Home;