// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/black.css';
// import { useEffect } from 'react';
import React, { useCallback } from 'react'
import { RevealMain, Section, Slides, useRevealDeck } from '../Reveal'
import ThemeContainer from '../ThemeContainer';


export default function Slide1(){
  const [Deck, { progress }] = useRevealDeck()

  const handleClick = useCallback(() => {
    if (Deck) Deck.right()
  }, [Deck])
  return (
    <>
      <section>
        <h1>Prodigy</h1>
      </section>
      <section>
        <h2>¿Qué es Prodigy?</h2>
        <p>
          Prodigy es una herramienta de seguimiento de usuarios para sitios web que te ayuda a
          obtener una segmentación más precisa y detallada para tus anuncios en Facebook y otras
          plataformas de publicidad pagada.
        </p>
      </section>
      <section>
        <h2>¿Cómo funciona Prodigy?</h2>
        <p>
          Prodigy funciona enviando los datos del comportamiento de los usuarios en tu sitio web a
          un servidor central. Una vez allí, la información se ordena y procesa para luego ser
          reenviada a la plataforma de publicidad correspondiente.
        </p>
      </section>
    </>
  )
}