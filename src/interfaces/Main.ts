import React, { ReactNode } from 'react'

export interface IUserLogin {
	username: string
	password: string
}

export interface AuthState {
	isAuthenticated: boolean
	username: string
}
export interface ILoginProps {
	onLoginSuccess: (isSuccess: boolean, username: string) => void
}
export interface IHeaderProps {
	onLogoutSuccess: () => void
	username: string
}

export interface IProcessManagementProps {
	setFile: React.Dispatch<React.SetStateAction<string>>
	file: string
	filterId: string | null
}
export interface IFileUploadPageProps {
	setFile: React.Dispatch<React.SetStateAction<string>>
}
export interface StatusMessage {
	Status:
		| 'Парсер не запущен'
		| 'Товары спаршены, подождите, идет сохранение'
		| 'Все прокси забанены, подождите, идет редактирование'
		| 'Парсер не запущен | Данные сохранены'
		| 'Парсер работает'
}

export interface PercentMessage {
	Percent_banned_list: number
	Percent_parsing_goods: number
}
export type Language = 'RU' | 'EN'
export interface LanguageContextType {
	language: Language
	toggleLanguage: () => void
}
export interface LanguageProviderProps {
	children: ReactNode
}

export interface Files {
	before_parsing_filename: string
	finish_date: string | null
	new_filter_id: number | null
	after_parsing_filename: string
	date: string
	user_id: number
	id: number
}
export interface AuthContextType {
	authState: AuthState
	token: string | null
	isLoading: boolean
	isAdmin: boolean
	login: (username: string, token: string, isAdmin: boolean) => void
	logout: () => void
}
export interface User {
	fullname: string
	description: string
	username: string
	is_admin: boolean
	id: number
	is_parsing: boolean
}
export interface IUsersProps {
	setEditingCardId?: React.Dispatch<React.SetStateAction<number | null|true>>
	editingCardId?: null | number|true
	users:User[]|undefined
	setUsers?:React.Dispatch<React.SetStateAction<User[]|undefined>>
  }
  
  export interface UserFormValues {
	fullName: string;
	description: string;
	username: string;
	password?: string;
	isAdmin: boolean ;
	isAdmunUI?:string|undefined
}