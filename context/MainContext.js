import { createContext, useEffect, useState } from "react";
// import { quizData as qd} from "../data/data";

export const MainContext = createContext()

const MainContextProvider = (props) => {
  const [ currentPhase, setCurrentPhase ] = useState(0)
  const [ sock, setSock ] = useState()

  // const quizData = qd

  useEffect(() => {
    let savedPhase = localStorage.getItem("phase");
    if(savedPhase) setCurrentPhase(savedPhase)

    return () => {
      sock.disconnect();
    };
  }, [])

  function setPhase(phase){
    setCurrentPhase(phase)
    localStorage.setItem("phase", phase);
  }

  function nextPhase(){
    let p = parseInt(currentPhase) + 1;
    setPhase(p)
  }

  function resetPhase(){
    setPhase(0)
  }

  return (
    <MainContext.Provider value={{
      currentPhase, setPhase, nextPhase, resetPhase
      , sock, setSock
    }}>
      {props.children}
    </MainContext.Provider>
  )
}
export default MainContextProvider;