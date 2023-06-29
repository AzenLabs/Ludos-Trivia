// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/black.css';
// import { useEffect } from 'react';
import React, { useCallback } from 'react'
import { RevealMain, Section, Slides, useRevealDeck } from '../Reveal'
import ThemeContainer from '../ThemeContainer';

// slide component for slide section before first activity
export default function Slide1(){
  const [Deck, { progress }] = useRevealDeck()

  const handleClick = useCallback(() => {
    if (Deck) Deck.right()
  }, [Deck])
  return (
    <>
      <section>
        <h1>Ludos Financial Literacy</h1>
      </section>
      <section>
        <h2>First Silde</h2>
        <p>
          Thsi is the first slide hello
        </p>
      </section>
      <section>
        <h2>2nd slide</h2>
        <p>
          Thsi is the 2nd slide hello
        </p>
      </section>
    </>
  )
}