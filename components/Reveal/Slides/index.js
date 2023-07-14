import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRevealDeck } from '..'

export default function Slides({ children, nextPhase }) {
  const [Deck, { progress, indices }] = useRevealDeck()

  useEffect(() => {
    console.log(progress)
    if(progress === 1) nextPhase()
  }, [progress])

  return (
    <>
      <div className="slides">{children}</div>
    </>
  )
}

Slides.propTypes = {
  children: PropTypes.any
}

Slides.defaultProps = {
  children: null
}
