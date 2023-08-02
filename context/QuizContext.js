import React, { createContext, useContext, useEffect, useState } from 'react';
import { quizData as qd} from "../data/data";
import { useConst } from '@chakra-ui/react';
import { UserContext } from './UserContext';

export const QuizContext = createContext();

const QuizContextProvider = (props) => {
  const [ quizProgress, setQuizProgress ] = useState(0) // qns num now
  const [ answeredBool, setAnsweredBool ] = useState(-1)

  const quizData = qd


  useEffect(() => {
    console.log("ans bool changed ", answeredBool)
  }, [answeredBool])

  function nextQuizProgress(){
    let p = quizProgress;
    storeQuizProgress(p + 1)
  }

  function storeQuizProgress(progress){
    // let a = ans;
    // a["qns_num"] = progress
    // setAns(a)

    console.log("GOING TO THE NEXT QUESTION", progress)
    // let b = false;
    // setAnsweredBool(answeredBool => false)    // new qns

    setQuizProgress(progress)
  }

  // function studentChoseAnswer(choice){
  //   let a = ans;
  //   a['ans'] = choice
  //   setAns(a)
  //   setAnsweredBool(answeredBool => true)   // qns answered
  // }


  return (
    <QuizContext.Provider value={{
      quizData, quizProgress, nextQuizProgress, storeQuizProgress,
      answeredBool, setAnsweredBool
    }}>
      {props.children}
    </QuizContext.Provider>
  )
}
export default QuizContextProvider;