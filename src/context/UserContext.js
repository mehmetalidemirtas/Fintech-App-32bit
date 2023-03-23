import React, {createContext, useState} from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    birthDate: '',
    identityNumber: '',
    photo: null,
    phone: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;