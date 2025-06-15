import { ProxyFormValues, Proxys } from '../../interfaces/Main'

interface ProxyResponse {
	status: boolean
	proxies?: Proxys[]
	message?: string
}
export interface GetAllAvailableProxy {
	proxies?: {
		port: string
		login: string
		id: number
		name: string
		password: string
		address: string
	}[]
	message: string | null
}
async function fetchProxies(
	url: string,
	token: string | null,
	language: 'RU' | 'EN'
): Promise<ProxyResponse> {
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'access-token': token || '',
			},
		})

		const data = await response.json()

		if (response.ok) {
			return { status: true, proxies: data }
		}

		if (response.status === 422) {
			return {
				status: false,
				message:
					language === 'RU'
						? 'Пожалуйста, заполните все поля'
						: 'Please fill in all fields',
			}
		}

		return {
			status: false,
			message:
				data.detail ||
				(language === 'RU' ? 'Произошла ошибка' : 'An error occurred'),
		}
	} catch (error) {
		return {
			status: false,
			message:
				language === 'RU'
					? 'Ошибка сети или сервера'
					: 'Network or server error',
		}
	}
}

export async function ExtendProxy(
	token: string | null,
	formValues: ProxyFormValues,
	language: 'RU' | 'EN'
): Promise<ProxyResponse> {
	const url = `https://api.autostructure.ru/v1/proxies/prolong_proxy?date=${formValues.date}&count=${formValues.count}&duration=${formValues.duration}`
	return fetchProxies(url, token, language)
}

export async function BuyProxy(
	token: string | null,
	formValues: ProxyFormValues,
	language: 'RU' | 'EN'
): Promise<ProxyResponse> {
	const url = `https://api.autostructure.ru/v1/proxies/buy_proxy?count=${formValues.count}&duration=${formValues.duration}`
	return fetchProxies(url, token, language)
}

export async function GetProxy(token: string | null): Promise<ProxyResponse> {
	const url = `https://api.autostructure.ru/v1/proxies/get_proxy_group`
	return fetchProxies(url, token, 'RU') // Язык не критичен, можно менять по необходимости
}

export async function GetAllAvailableProxy(
	language: 'RU' | 'EN'
): Promise<GetAllAvailableProxy> {
	try {
		const response = await fetch(
			'https://api.autostructure.ru/v1/new_parser/get-all-available-proxies',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		const data = await response.json()

		if (response.ok) {
			return { proxies: data, message: null }
		} else
			return {
				message:
					data.detail ||
					(language === 'RU'
						? 'Произошла ошибка'
						: 'An error occurred'),
			}
	} catch (error) {
		return {
			message:
				language === 'RU'
					? 'Ошибка сети или сервера'
					: 'Network or server error',
		}
	}
}
