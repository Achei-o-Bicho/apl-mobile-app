import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPets, setUserPets] = useState([]);
  const [addingNewPet, setAddingNewPet] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  return (
    <UserContext.Provider value={{
      userId, setUserId,
      userName, setUserName,
      userPets, setUserPets,
      accessToken, setAccessToken,
      addingNewPet, setAddingNewPet
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);