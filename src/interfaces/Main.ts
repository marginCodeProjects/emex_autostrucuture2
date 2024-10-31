import React, { ReactNode, SetStateAction } from 'react'

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
	filename_after_parsing: string
	filename_after_parsing_with_nds: string
	filename_after_parsing_without_nds: string
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
	setEditingCardId?: React.Dispatch<
		React.SetStateAction<number | null | true>
	>
	editingCardId?: null | number | true
	users: User[] | undefined
	setUsers?: React.Dispatch<React.SetStateAction<User[] | undefined>>
}

export interface UserFormValues {
	fullName: string
	description: string
	username: string
	password?: string
	isAdmin: boolean
	isAdmunUI?: string | undefined
}

export interface ProxyFormValues {
	date?: string
	count: number | undefined
	duration: number | undefined
}
export interface Proxys {
	expired_at: string
	count: number
}
export interface FilterFormValues {
	deep_filter: number
	deep_analog: number
	analog: boolean
	title: string
	is_bigger: boolean
	date: number
	logo: string
	pickup_point: number
	replacement: boolean
}
export interface FilterOption {
	id: string
	title: string
	deep_filter: number
	is_bigger: boolean
	logo: string
	deep_analog: number
	analog: boolean
	date: number
	user_id: number
	pickup_point: number
	replacement: boolean
}

// Типы состояния
export interface FiltersState {
	filters?: FilterOption[]
	setFilters?: React.Dispatch<
		React.SetStateAction<FilterOption[] | undefined>
	>
	loading: boolean
	error: string | null
}

export interface SessionTableRowData {
	good_code: string
	article: string
	name: string
	brand: string
	article1: string
	price: string
	logo: string
	new_price: string
	user_id: number
	id: number
	quantity: string
	batch: string
	delivery_time: string
	quantity1: string
	file_id: number
	best_price?: string
	best_price_with_nds?: string
	best_price_without_nds?: string
}
export interface SessionTableAPI {
	total: number
	rows: SessionTableRowData[]
}
export interface SessionDataTableProps {
	fileName: string | undefined
	fileType: null | 'afterParsing' | 'withoutNds' | 'withNds'
}

export interface IPagePartTitleProps {
	num: string
	label: string
}

export interface ICardScrollingProps {
	setSelectedCardId: React.Dispatch<SetStateAction<string | null>>
	selectedCardId: string | null
}
export interface AllDataTableProps {
	setFileName: React.Dispatch<React.SetStateAction<string | undefined>>
	setFileType: React.Dispatch<
		React.SetStateAction<null | 'afterParsing' | 'withoutNds' | 'withNds'>
	>
}
