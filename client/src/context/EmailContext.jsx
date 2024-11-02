import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export const SelectedEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext.Provider value={{ email,setEmail}}>
      {children}
    </EmailContext.Provider>
  );
};