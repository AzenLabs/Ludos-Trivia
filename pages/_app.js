import { ChakraProvider } from '@chakra-ui/react'
import UserContextProvider from '../context/UserContext';
import '../styles/styles.css'

import '../components/Reveal/revealjs/css/reveal.css'
import '../components/Reveal/revealjs/css/theme/white.css'


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