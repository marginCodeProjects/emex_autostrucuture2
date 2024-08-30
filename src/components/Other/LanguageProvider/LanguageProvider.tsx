import { createContext, useState, useContext } from 'react'
import { Language, LanguageContextType, LanguageProviderProps } from '../../../interfaces/Main'

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}


export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	children,
}) => {
	const [language, setLanguage] = useState<Language>('RU')

	const toggleLanguage = () => {
		setLanguage((prevLanguage) => (prevLanguage === 'RU' ? 'EN' : 'RU'))
	}

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}
