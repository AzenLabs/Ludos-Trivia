import { Button, FormControl, FormLabel, Input, InputGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import { useContext, useEffect, useRef } from "react"
import { MainContext } from "../context/MainContext";
import { io } from "socket.io-client";

let socket;

export default function HostAuth(){
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
  let toast = useToast()
  const initialRef = useRef(null)

  let { setSock, sock } = useContext(MainContext)


  async function socketInitializer(key) {
    socket = io(undefined, {
      path: "/api/socket",
    });
    console.log(key)
    socket.on("connect", (data) => {
      // check if key correct first
      socket.emit("is-host", key); // auth host with key
    });
    socket.on("auth-host", (data) => {    // check whether key is auth or not
      console.log(data)
      if(data){
        setSock(socket)
      }else{
        toast({
          title: "Wrong Key",
          // description: data.username + " just joined",
          position: "bottom-left",
          duration: 1000,
          isClosable: true,
          status:"error"
        });
      }
    })
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent >
          <Formik
            initialValues={{
              key: ""
            }}
            onSubmit={(values, actions) => {
              console.log(values)
              if(values.key){
                socketInitializer(values.key)
              }
            }}
          >
            
              {/* <ModalCloseButton /> */}
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <ModalHeader textAlign={"center"}>Enter Host Key</ModalHeader>
                  {/* <ModalBody pb={6}> */}
                    <Field name="key">
                      {({ field, form }) => (
                        <FormControl isRequired w="80%" mx="auto">
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Key"
                              variant="filled"
                              type="password"
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>


                  <ModalFooter>
                    <Button colorScheme='blue' mr={3}
                      type="submit"
                    >
                      Submit
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