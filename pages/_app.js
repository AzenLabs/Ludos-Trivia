import { ChakraProvider } from '@chakra-ui/react'
import UserContextProvider from '../context/UserContext';
import '../styles/styles.css'


const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <UserContextProvider>
        <ChakraProvider>
          <Component {...pageProps}/>
        </ChakraProvider>
      </UserContextProvider>
    </>
  )
}
export default MyApp