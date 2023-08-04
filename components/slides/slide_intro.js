/**
 * @deprecated
 *
 * Moving to no-code slides, hence would not require use of Reveal slide controls
 * To edit slide deck: https://slides.com/teamazen/palette
 *
 */
// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import "/node_modules/reveal.js/dist/reveal.css";
import "/node_modules/reveal.js/dist/theme/white.css";
// import { useEffect } from 'react';
import React, { useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { useRevealDeck } from "../Reveal";

// slide component for slide section before first activity
export default function SlideIntro(){
  const [Deck, { progress }] = useRevealDeck()

  const handleClick = useCallback(() => {
    if (Deck) {
      Deck.right();
    }
  }, [Deck]);

  return (
    <>
      <section>
        <h1>Ludos Financial Literacy</h1>
      </section>
      <section>
        {/* Render the image using the Box component */}
        <Box
          // width="100vw"
          height="100vh"
          backgroundImage="url('/img/slide1.png')"
          backgroundRepeat="no-repeat"
        >
          <h1>
            <strong>Financial Literacy</strong>
          </h1>

          <strong>Let's Play!</strong>
        </Box>
      </section>
    </>
  );
}
