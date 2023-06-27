import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import UserContextProvider from '../context/UserContext';


const MyApp = ({ Component, pageProps }) => {
  // const [socket, setSocket] = useState()
  // let socket;

  // useEffect(() => {
  //   socket = io(undefined, {
  //     path:'/api/socket'
  //   })
  //   // setSocket(_sock)

  //   // _sock.on("test", (data) => {
  //   //   console.log("Received: ", data)
  //   // });
  //   // socket.on("connect", () => {
  //   //   console.log(socket)
  //   //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  //   //   socket.emit("test", {"msg": "bruh"})
  //   // });
    
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [])

  return (
    <>
      {/* <SocketContext.Provider value={socket}> */}
      <UserContextProvider>
        <ChakraProvider>
          <Component {...pageProps}/>
        </ChakraProvider>
      {/* </SocketContext.Provider> */}
      </UserContextProvider>
    </>
  )
}
export default MyApp