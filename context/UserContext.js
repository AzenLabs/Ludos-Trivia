import React, { createContext, useEffect, useState } from 'react';
export const UserContext = createContext();


const UserContextProvider = (props) => {
  const [ user, setUser ] = useState({});
  const [ emeralds, setEmeralds ] = useState(0)

  useEffect(() => {
    let userStr = localStorage.getItem('user')
    try{
      setUser(JSON.parse(userStr));
    }catch{}
    
  }, []);

  const storeUser = (user) => {
    console.log("new user set", user)
    setUser({   // do NOT store emeralds into the local storage, shld refetch on refresh
      username: user.username,
      email: user.email,
      class: user.class
    })
    localStorage.setItem("user", JSON.stringify(user))
  }
  const logout = () => {
    setUser({});
  }
  return (
    <UserContext.Provider value={{ user,  storeUser, emeralds, setEmeralds }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;