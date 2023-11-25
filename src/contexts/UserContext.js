import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPets, setUserPets] = useState([]);
  const [addingNewPet, setAddingNewPet] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [endToEnd, setEndToEnd] = useState(null);
  const [petToRecognizePicture, setPetToRecognizePicture] = useState(null);
  const [recentScannedPets, setRecentScannedPets] = useState([]);
  const [socket, setSocket] = useState();

  return (
    <UserContext.Provider value={{
      userId, setUserId,
      userName, setUserName,
      userPets, setUserPets,
      accessToken, setAccessToken,
      addingNewPet, setAddingNewPet,
      recognizing, setRecognizing,
      endToEnd, setEndToEnd,
      petToRecognizePicture, setPetToRecognizePicture,
      recentScannedPets, setRecentScannedPets,
      socket, setSocket
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);