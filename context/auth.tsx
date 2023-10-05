import React, { useContext } from 'react'

const AuthContext = React.createContext({
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const login = async (token: string) => {
    localStorage.setItem('auth_token', token)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
  }

  const value = {
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
