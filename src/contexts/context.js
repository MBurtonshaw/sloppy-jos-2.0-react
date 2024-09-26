import React, { createContext, useState } from 'react';

const CustomerContext = createContext({
  message: 'hey'
});

const CustomerProvider = ({ children }) => {
  const [message, setMessage] = useState('hey');

  return (
    <CustomerContext.Provider value={{ message, setMessage }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Export both the context and provider
export { CustomerContext, CustomerProvider };