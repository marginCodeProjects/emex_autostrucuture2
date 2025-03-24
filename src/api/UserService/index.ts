import { FormProps } from 'antd'
import { NavigateFunction } from 'react-router-dom'
import { IUserLogin, User, UserFormValues } from '../../interfaces/Main'

interface ApiResponse<T> {
	success: boolean
	message?: string
	data?: T
}

async function fetchApi<T>(
	url: string,
	method: string,
	token: string | null,
	body?: object
): Promise<ApiResponse<T>> {
	try {
		const response = await fetch(url, {
			method,
			body: body ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json',
				...(token ? { 'access-token': token } : {}),
			},
		})

		const data = response.ok ? await response.json() : null
		return {
			success: response.ok,
			message: response.ok ? undefined : data?.detail || 'Ошибка запроса',
			data,
		}
	} catch (error) {
		return {
			success: false,
			message: 'Ошибка сети или сервера',
		}
	}
}

export async function handleLogout(
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
	token: string | null,
	onLogoutSuccess: () => void
) {
	const { success, message } = await UserLogout(token)
	if (success) onLogoutSuccess()
	else setErrorMessage(message)
}

export async function UserLogin(
	data: IUserLogin
): Promise<
	ApiResponse<{ username: string; token: string; is_admin: boolean }>
> {
	return fetchApi(
		'https://api.autostructure.ru/v1/users/login',
		'POST',
		null,
		{ username: data.username, password: data.password }
	)
}

export const onFinish =
	(
		login: (username: string, token: string, isAdmin: boolean) => void,
		navigate: NavigateFunction,
		setErrorMessage: (message: string | null) => void
	): FormProps<IUserLogin>['onFinish'] =>
	async (values) => {
		const result = await UserLogin(values)
		if (result.success && result.data) {
			const { username, token, is_admin } = result.data
			login(username, token, is_admin)
			navigate('/')
		} else {
			setErrorMessage(result.message || null)
		}
	}

export async function UserLogout(
	token: string | null
): Promise<ApiResponse<null>> {
	const response = await fetchApi<null>(
		'https://api.autostructure.ru/v1/users/logout',
		'GET',
		token
	)
	if (response.success) localStorage.removeItem('token')
	return response
}

export async function GetAllUsers(
	token: string | null
): Promise<User[] | undefined> {
	const response = await fetchApi<User[]>(
		'https://api.autostructure.ru/v1/users/show_all',
		'GET',
		token
	)
	return response.success ? response.data : undefined
}

export async function DeleteUser(
	token: string | null,
	user_id: number
): Promise<User[] | undefined> {
	const response = await fetchApi<User[]>(
		`https://api.autostructure.ru/v1/users/delete/${user_id}`,
		'DELETE',
		token
	)
	return response.success ? response.data : undefined
}

export async function EditUser(
	token: string | null,
	user_id: number,
	userInfo: UserFormValues
): Promise<ApiResponse<User[]>> {
	return fetchApi<User[]>(
		`https://api.autostructure.ru/v1/users/edit/${user_id}`,
		'PATCH',
		token,
		{
			fullname: userInfo.fullName,
			description: userInfo.description,
			username: userInfo.username,
			is_admin: userInfo.isAdmin,
			password: userInfo.password,
		}
	)
}

export async function CreateUser(
	token: string | null,
	userInfo: UserFormValues
): Promise<ApiResponse<User[]>> {
	return fetchApi<User[]>(
		'https://api.autostructure.ru/v1/users/sign_up',
		'POST',
		token,
		{
			fullname: userInfo.fullName,
			description: userInfo.description,
			username: userInfo.username,
			is_admin: userInfo.isAdmin,
			password: userInfo.password,
		}
	)
}
