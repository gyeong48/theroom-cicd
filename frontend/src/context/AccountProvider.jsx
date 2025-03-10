import React, { createContext, useState } from 'react'
import { useSelector } from 'react-redux';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const loginState = useSelector(state => state.loginSlice);

  const [formData, setFormData] = useState({
    username: loginState.user.username,
    currentPassword: "",
    newPassword: "",
    newPasswordCheck: ""
  })

  return (
    <AccountContext.Provider value={{ formData, setFormData }}>
      {children}
    </AccountContext.Provider>
  )
}