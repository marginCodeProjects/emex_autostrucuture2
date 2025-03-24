async function fetchAPI<T>(
	url: string,
	method: 'GET' | 'POST' | 'DELETE' = 'GET',
	token?: string | null,
	body?: any
): Promise<T> {
	const headers: HeadersInit = { 'Content-Type': 'application/json' }
	if (token) headers['access-token'] = token

	const response = await fetch(`https://api.autostructure.ru/v1${url}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	})

	if (!response.ok) {
		const error = new Error('Network response was not ok')
		;(error as any).status = response.status
		throw error
	}

	return response.json()
}

export async function ParserStart(
	filterId: string | null,
	token: string | null,
	currentProxySource: string,
	language: 'RU' | 'EN'
): Promise<{ success: boolean; message: string }> {
	if (!filterId) {
		return { success: false, message: language === 'RU' ? 'Пожалуйста, выберите фильтр' : 'Please select a filter' }
	}

	try {
		await fetchAPI(`/new_parser/start/${filterId}?using_proxy=${currentProxySource}`, 'GET', token)
		return { success: true, message: language === 'RU' ? 'Парсер запущен' : 'Parser is up and running' }
	} catch (error: any) {
		const messageMap: Record<number, string> = {
			405: language === 'RU' ? 'Файл уже был спаршен' : 'The file has already been parsed',
			409: language === 'RU' ? 'Все прокси в бане' : 'All proxies are banned',
		}
		return { success: false, message: messageMap[error.status] || (language === 'RU' ? 'Ошибка запуска парсера' : 'Parser start error') }
	}
}

export async function ParserStop(
	token: string | null,
	language: 'RU' | 'EN'
): Promise<{ success: boolean; message: string }> {
	try {
		await fetchAPI('/new_parser/stop', 'GET', token)
		return { success: true, message: language === 'RU' ? 'Парсер остановлен' : 'Parser stopped' }
	} catch {
		return { success: false, message: language === 'RU' ? 'Ошибка остановки парсера' : 'Parser stop error' }
	}
}

export async function GetMangoProxyTrafficAvailable(
	language: 'RU' | 'EN'
): Promise<{ success: boolean; availableTraffic?: number; message?: string }> {
	try {
		const response = await fetch('https://backend.mangoproxy.com/public-api/v1/traffic', {
			method: 'GET',
			headers: { 'x-api-key': 'mango_fd49e4bb0ee651047a557a0a81f0d08c9d1a2bc71b05032adb712ed488759ae9' },
		})

		if (!response.ok) throw new Error('Network error')

		const data = await response.json()
		return { success: true, availableTraffic: data.availableMB }
	} catch {
		return { success: false, message: language === 'RU' ? 'Ошибка получения данных' : 'Error retrieving data' }
	}
}

export async function GetBrightProxyTrafficAvailable(
	language: 'RU' | 'EN'
): Promise<{ success: boolean; balance?: number; pendingCosts?: number; message?: string }> {
	try {
		const data = await fetchAPI<{ balance: number; pending_costs: number }>('/proxies/get_balance_bright_data')
		return { success: true, balance: data.balance, pendingCosts: data.pending_costs }
	} catch {
		return { success: false, message: language === 'RU' ? 'Ошибка получения данных' : 'Error retrieving data' }
	}
}