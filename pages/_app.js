import { ChakraProvider } from '@chakra-ui/react'
import UserContextProvider from '../context/UserContext';
import MainContextProvider from '../context/MainContext';
import '../styles/styles.css'

import '../components/Reveal/revealjs/css/reveal.css'
import '../components/Reveal/revealjs/css/theme/white.css'


const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <UserContextProvider>
        <ChakraProvider>
          <MainContextProvider>
            <div className='main'>
              <Component {...pageProps}/>
            </div>
            
          </MainContextProvider>
          
        </ChakraProvider>
      </UserContextProvider>
    </>
  )
}
export default MyApp