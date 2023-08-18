import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPets, setUserPets] = useState([]);

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