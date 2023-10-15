import React, { ReactNode, useContext, useEffect } from 'react'
import apiClient from '../lib/apiClient'

interface AuthContextType {
  login: (token: string) => void
  logout: () => void
}
interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem('auth_token')
  useEffect(() => {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
  }, [])

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
