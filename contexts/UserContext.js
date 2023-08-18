import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    console.log(userId);
    console.log(userName);
    console.log(userPets);
  }, [userId, userName, userPets])

  return (
    <UserContext.Provider value={{
      userId, setUserId,
      userName, setUserName,
      userPets, setUserPets
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);