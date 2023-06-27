import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
export const UserContext = createContext();


const UserContextProvider = (props) => {
  const [ user, setUser ] = useState({});

  useEffect(() => {
    let userStr = localStorage.getItem('user')
    try{
      setUser(JSON.parse(userStr));
    }catch{}
    
  }, []);

  const storeUser = (user) => {
    console.log("new user set", user)
    setUser({
      username: user.username,
      email: user.email
    })
    localStorage.setItem("user", JSON.stringify(user))
  }
  const logout = () => {
    setUser({});
  }
  return (
    <UserContext.Provider value={{ user,  storeUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;