import { createContext } from 'react'
import { LanguageContextType } from '../../../interfaces/Main'

export const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)
