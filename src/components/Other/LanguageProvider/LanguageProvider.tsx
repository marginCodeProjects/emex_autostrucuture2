
import React, { useState } from 'react';
import { Language, LanguageProviderProps } from '../../../interfaces/Main';
import { LanguageContext } from './LanguageContext';


export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
	const [language, setLanguage] = useState<Language>('RU');

	const toggleLanguage = () => {
		setLanguage((prevLanguage) => (prevLanguage === 'RU' ? 'EN' : 'RU'));
	};

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};