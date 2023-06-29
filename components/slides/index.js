import { RevealMain, Section, Slides } from "../Reveal";
import ThemeContainer from "../ThemeContainer";
import Slide1 from "./slide_1";

export default function SlideContainer({currentSlide}){
  return (
    <>
      <ThemeContainer>
        <RevealMain>
          <Slides>
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