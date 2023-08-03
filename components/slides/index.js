import { useContext, useEffect, useState } from "react";
import { RevealMain, Section, Slides, useRevealDeck } from "../Reveal";
import ThemeContainer from "../ThemeContainer";
import { MainContext } from "../../context/MainContext";
import { Spinner } from "@chakra-ui/react";
import SlideIntro from "./slide_intro";
import SlideLongTermSavingHabits from "./slide_ltsh";

export default function SlideContainer({currentSlide, nextPhase}){
  const [ slideToShow, setSlideToShow ] = useState(<Spinner/>)
  let { currentPhase } = useContext(MainContext)

  return (
    <>
      <ThemeContainer>
        <RevealMain>
          <Slides nextPhase={nextPhase}>
            <Section>
              {/* {slideList[currentPhase]} */}
              {currentSlide}
            </Section>
          </Slides>
        </RevealMain>
      </ThemeContainer>
    </>
  )
}


