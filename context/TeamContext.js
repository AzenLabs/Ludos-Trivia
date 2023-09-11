import React, { createContext, useState } from "react";
export const TeamContext = createContext();

const TeamContextProvider = (props) => {
  const team = [
    "3 Empathy",
    "3 Honour",
    "3 Diligence",
    "3 Resilience",
    "3 Integrity",
    "3 Harmony",
    "3 Respect",
    "3 Kindness",
  ];
  const [teamEmeralds, setTeamEmeralds] = useState(0);

  return (
    <TeamContext.Provider
      value={{
        team,
        teamEmeralds,
        setTeamEmeralds,
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
};
export default TeamContextProvider;
