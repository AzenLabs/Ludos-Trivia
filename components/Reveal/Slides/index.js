import React, { useEffect, useState } from 'react'
import { Button } from "@chakra-ui/react";
import PropTypes from 'prop-types'
import { useRevealDeck } from '..'

export default function Slides({ children, nextPhase }) {
  const [Deck, { progress, indices }] = useRevealDeck()
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (progress === 1) {
      setIsButtonVisible(true);
    }
  }, [progress])

  return (
    <>
      <div className="slides">{children}</div>
      {isButtonVisible && (
        <Button 
        onClick={nextPhase}
        position="absolute"
        bottom="2rem"
        left="50%"
        transform="translateX(-50%)">
          Next Phase
        </Button>
      )}
    </>
  )
}

Slides.propTypes = {
  children: PropTypes.any
}

Slides.defaultProps = {
  children: null
}
