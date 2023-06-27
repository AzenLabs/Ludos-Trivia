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
      <FormLayout>
        <Box
          w="100%"
          h={['80vh', '95vh']}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <Center>
            <ScaleFade initialScale={0.5} in={true}>
              <Card w={['90vw', '80vw', '40vw']} bg={"whiteAlpha.900"}>
                <CardHeader textAlign="center">
                  <Heading color="green.500">Join Room</Heading>
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
                          router.push('/lobby')
                        }
                      }, 400)
                    }}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <Stack spacing={4}>
                        <Field name="username">
                            {({ field, form }) => (
                              <FormControl isRequired>
                                <InputGroup>
                                  <InputLeftElement
                                    children={<Icon as={FaUserAlt} />}
                                  />
                                  <Input
                                    {...field}
                                    placeholder="Display name"
                                    variant="filled"
                                    type="text"
                                  />
                                </InputGroup>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="email">
                            {({ field, form }) => (
                              <FormControl isRequired>
                                <InputGroup>
                                  <InputLeftElement
                                    children={<Icon as={AiOutlineMail} />}
                                  />
                                  <Input
                                    {...field}
                                    placeholder="Email"
                                    variant="filled"
                                    type="email"
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
                                placeholder='Class' variant={"filled"}>
                                  <option value='3H'>3H</option>
                                  <option value='3G'>3G</option>
                                  <option value='3F'>3F</option>
                                </Select>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            width="full"
                            variant="solid"
                            colorScheme="green"
                            leftIcon={<Icon as={BiLogIn} />}
                            isLoading={props.isSubmitting}
                            type="submit"
                          >
                            Join Room
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
      </FormLayout>
    </>
  );
};

export default Home;