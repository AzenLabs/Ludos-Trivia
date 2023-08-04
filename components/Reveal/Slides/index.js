import React, { useEffect, useState } from "react";
import { Button, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRevealDeck } from "..";

export default function Slides({ children, nextPhase }) {
  const [Deck, { progress, indices }] = useRevealDeck();
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (progress === 1) {
      setIsButtonVisible(true);
    }
  }, [progress]);

  return (
    <>
      <div className="slides">{children}</div>
    </>
  );
}

Slides.propTypes = {
  children: PropTypes.any,
};

Slides.defaultProps = {
  children: null,
};
