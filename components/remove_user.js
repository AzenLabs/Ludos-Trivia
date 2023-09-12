import { Button, FormControl, FormLabel, Input, InputGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import { useContext, useEffect, useRef } from "react"
import { MainContext } from "../context/MainContext";
import { io } from "socket.io-client";

let socket;

export default function RemoveUser(){
  const { isOpen, onOpen, onClose } = useDisclosure()
  let toast = useToast()
  const initialRef = useRef(null)

  let { sock } = useContext(MainContext)

  return (
    <>
      <Button onClick={onOpen}>Remove User</Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent >
          <Formik
            initialValues={{
              username: ""
            }}
            onSubmit={(values, actions) => {
              console.log(values)
              if(values.username){
                sock.emit("remove-user", values.username);
              }
            }}
          >
            
              {/* <ModalCloseButton /> */}
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <ModalHeader textAlign={"center"}>Remove User</ModalHeader>
                  {/* <ModalBody pb={6}> */}
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl isRequired w="80%" mx="auto">
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Username"
                              variant="filled"
                              type="password"
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>


                  <ModalFooter>
                    <Button colorScheme='red' mr={3}
                      type="submit"
                      onClick={onClose}
                    >
                      Remove
                    </Button>
                  </ModalFooter>
                </Form>
              )}

          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}