import { createContext, useEffect, useState } from "react";
import { quizData as qd, blanksData as bd } from "../data/data";

export const MainContext = createContext()

const MainContextProvider = (props) => {
  const [ currentPhase, setCurrentPhase ] = useState(0)
  const [ sock, setSock ] = useState()
  // const [ currentQnsIndex, setCurrentQnsIndex ] = useState(0)
  // const [ quizProgress, setQuizProgress ] = useState(0)

  // const quizData = {
  //   2: {
  //     "title": "Very poggers lmao",
  //     "description": "this is a very bruh description",
  //     "qns": [
  //       {
  //         "qns": "Qns 1 test",
  //         "options": [
  //           "yes",
  //           "bruh",
  //           "huh",
  //           "wtf"
  //         ],
  //         "correct": 1,
  //         "explain": "because why tf not"
  //       },
  //       {
  //         "qns": "Qns 2 test",
  //         "options": [
  //           "gg",
  //           "well done",
  //           "cool"
  //         ],
  //         "correct": 2,
  //         "explain": "very nice"
  //       }
  //     ]
  //   }
    
  // }
  const quizData = qd
  const blanksData = bd

  return (
    <MainContext.Provider value={{
      quizData, currentPhase, setCurrentPhase, sock, setSock,
      blanksData
    }}>
      {props.children}
    </MainContext.Provider>
  )
}
export default MainContextProvider;