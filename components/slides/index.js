import { RevealMain, Section, Slides } from "../Reveal";
import ThemeContainer from "../ThemeContainer";
import Slide1 from "./slide_1";

export default function SlideContainer(){
  return (
    <>
      <ThemeContainer>
        <RevealMain>
          <Slides>
            <Section>
              <Slide1/>
            </Section>
          </Slides>
        </RevealMain>
      </ThemeContainer>
    </>
  )
}