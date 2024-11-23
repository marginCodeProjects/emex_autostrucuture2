import { FormProps } from 'antd'
import { NavigateFunction } from 'react-router-dom'
import { IUserLogin, User, UserFormValues } from '../../interfaces/Main'

export async function handleLogout(
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
	token: string | null,
	onLogoutSuccess: () => void,
	language: 'EN' | 'RU'
) {
	try {
		const { success, message } = await UserLogout(token, language)
		if (success) {
			onLogoutSuccess()
		} else {
			setErrorMessage(message)
		}
	} catch (error) {
		setErrorMessage(
			language === 'RU' ? 'Произошла ошибка' : 'There was an error'
		)
	}
}

export async function UserLogin(
	data: IUserLogin,
	language: 'RU' | 'EN'
): Promise<{
	success: boolean
	message: string
	username: string
	token: string
	is_admin: boolean
}> {
	try {
		const response = await fetch(
			'https://api-dev.autostructure.ru/v1/users/login',
			{
				method: 'POST',
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (response.ok) {
			const userInfo = await response.json()

			return {
				success: true,
				message:
					language === 'RU' ? 'Успешный вход' : 'Successful entry',
				username: userInfo.username,
				token: userInfo.access_token,
				is_admin: userInfo.is_admin,
			}
		} else {
			let errorMessage =
				language === 'RU' ? 'Ошибка входа' : 'Login error'

			if (response.status === 404) {
				errorMessage =
					language === 'RU' ? 'Неправильный логин' : 'Incorrect login'
			} else if (response.status === 401) {
				errorMessage =
					language === 'RU' ? 'Доступ запрещен' : 'Access denied'
			}

			return {
				success: false,
				message: errorMessage,
				username: '',
				token: '',
				is_admin: false,
			}
		}
	} catch (error) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Ошибка сети или сервера'
					: 'Network or server error',
			username: '',
			token: '',
			is_admin: false,
		}
	}
}

// Функция onFinish
export const onFinish =
	(
		login: (username: string, token: string, isAdmin: boolean) => void,
		navigate: NavigateFunction,
		setErrorMessage: (message: string | null) => void,
		language: 'RU' | 'EN'
	): FormProps<IUserLogin>['onFinish'] =>
	async (values) => {
		const result = await UserLogin(values, language)

		if (result.success) {
			login(result.username, result.token, result.is_admin)
			navigate('/') // Перенаправление после успешного логина
		} else {
			setErrorMessage(result.message)
		}
	}

export async function UserLogout(
	token: string | null,
	language: 'EN' | 'RU'
): Promise<{
	success: boolean
	message?: string
}> {
	try {
		const response = await fetch(
			'https://api-dev.autostructure.ru/v1/users/logout',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			localStorage.removeItem('token')
			return { success: true }
		} else {
			return {
				success: false,
				message: language === 'RU' ? 'Ошибка выхода' : 'Exit error',
			}
		}
	} catch (error) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Ошибка сети или сервера'
					: 'Network or server error',
		}
	}
}

export async function GetAllUsers(
	token: string | null
): Promise<User[] | undefined> {
	try {
		const response = await fetch(
			'https://api-dev.autostructure.ru/v1/users/show_all',
			{
				method: 'GET',

				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const usersInfo: User[] = await response.json()
			return usersInfo
		} else {
			return undefined // Если ответ не ок
		}
	} catch (error) {
		// Приводим error к типу, совместимому с message.error

		return undefined // Возвращаем undefined в случае ошибки
	}
}

export async function DeleteUser(
	token: string | null,
	user_id: number
): Promise<User[] | undefined> {
	const response = await fetch(
		`https://api-dev.autostructure.ru/v1/users/delete/${user_id}`,
		{
			method: 'DELETE',

			headers: {
				'Content-Type': 'application/json',
				'access-token': `${token}`,
			},
		}
	)

	if (response.ok) {
		const usersInfo: User[] = await response.json()
		return usersInfo
	} else {
		return undefined
	}
}
export async function EditUser(
	token: string | null,
	user_id: number,
	userInfo: UserFormValues,
	language: 'EN' | 'RU'
): Promise<{
	status: boolean
	Message: string
	users?: User[]
}> {
	try {
		const response = await fetch(
			`https://api-dev.autostructure.ru/v1/users/edit/${user_id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					fullname: userInfo.fullName,
					description: userInfo.description,
					username: userInfo.username,
					is_admin: userInfo.isAdmin,
					password: userInfo.password,
				}),
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const userInfo = await response.json()

			return {
				status: true,
				Message:
					language === 'RU'
						? 'Данные успешно изменены'
						: 'Data successfully changed',
				users: userInfo,
			}
		} else {
			return {
				status: false,
				Message:
					language === 'RU'
						? 'Произошла ошибка'
						: 'There was an error',
			}
		}
	} catch (error) {
		return {
			status: false,
			Message:
				language === 'RU' ? 'Произошла ошибка' : 'There was an error',
		}
	}
}
export async function CreateUser(
	token: string | null,
	userInfo: UserFormValues,
	language: 'EN' | 'RU'
): Promise<{
	status: boolean
	Message: string
	users?: User[]
}> {
	try {
		const response = await fetch(
			`https://api-dev.autostructure.ru/v1/users/sign_up`,
			{
				method: 'POST',
				body: JSON.stringify({
					fullname: userInfo.fullName,
					description: userInfo.description,
					username: userInfo.username,
					is_admin: userInfo.isAdmin,
					password: userInfo.password,
				}),
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const userInfo = await response.json()

			return {
				status: true,
				Message:
					language === 'RU'
						? 'Данные успешно изменены'
						: 'Data successfully changed',
				users: userInfo,
			}
		} else {
			return {
				status: false,
				Message:
					language === 'RU'
						? 'Произошла ошибка'
						: 'There was an error',
			}
		}
	} catch (error) {
		return {
			status: false,
			Message:
				language === 'RU' ? 'Произошла ошибка' : 'There was an error',
		}
	}
}
