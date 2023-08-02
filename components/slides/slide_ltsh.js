/**
 * 
 * Moving to no-code slides, hence would not require use of Reveal slide controls
 * To edit slide deck: https://slides.com/teamazen/palette
 * 
 */
// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/white.css';
// import { useEffect } from 'react';
import React, { useCallback, useEffect } from 'react'
import { RevealMain, Section, Slides, useRevealDeck } from '../Reveal'

// slide component for slide section before first activity
export default function SlideLongTermSavingHabits(){
  const [Deck, { progress }] = useRevealDeck()

  const handleClick = useCallback(() => {
    if (Deck){
      Deck.right()
    }

  }, [Deck])

  return (
    <>
      <section>
        <h1>#1 Long Term Saving Habits</h1>
      </section>
      <section>
          <h2>save save save</h2>
          <p>
            Rules blab bla bla
          </p>
        </section>
        <section>
          <h2>Long term no short term ya</h2>
          <p>
            yap yap yap ypa
          </p>
      </section>
    </>
    
  )
}