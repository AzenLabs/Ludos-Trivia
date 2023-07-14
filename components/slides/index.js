import { useEffect } from "react";
import { RevealMain, Section, Slides, useRevealDeck } from "../Reveal";
import ThemeContainer from "../ThemeContainer";

export default function SlideContainer({currentSlide, nextPhase}){

  return (
    <>
      <ThemeContainer>
        <RevealMain>
          <Slides nextPhase={nextPhase}>
            <Section>
              {/* <Slide1/> */}
              {currentSlide}
            </Section>
          </Slides>
        </RevealMain>
      </ThemeContainer>
    </>
  )
}