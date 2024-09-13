import { createContext } from 'react'
import { AuthContextType } from '../../../interfaces/Main'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
