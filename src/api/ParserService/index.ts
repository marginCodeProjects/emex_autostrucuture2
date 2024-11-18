export async function ParserStart(
	filterId: string | null,
	token: string | null,
	currentProxySource: string,
	language: 'RU' | 'EN'
): Promise<{ success: boolean; message: string }> {
	if (filterId === null) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Пожалуйста выберите фильтр'
					: 'Please select a filter',
		}
	}
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/new_parser/start/${filterId}?using_proxy=${currentProxySource}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.status === 200) {
			return {
				success: true,
				message:
					language === 'RU'
						? 'Парсер запущен'
						: 'Parser is up and running',
			}
		} else if (response.status === 405) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Файл уже был спаршен'
						: 'The file has already been sparred',
			}
		} else if (response.status === 409) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Все прокси в бане'
						: 'All proxies are banned',
			}
		} else {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка запуска парсера'
						: 'Parser start error',
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

export async function ParserStop(
	token: string | null,
	language: 'RU' | 'EN'
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/new_parser/stop`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			return {
				success: true,
				message:
					language === 'RU' ? 'Парсер остановлен' : 'Parser stopped',
			}
		} else {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка остановки парсера'
						: 'Parser stop error',
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
export async function GetMangoProxyTrafficAvalibale(
	language: 'RU' | 'EN'
): Promise<{ success: boolean; AvailableTraffick?: number; message?: string }> {
	try {
		const response = await fetch(
			'https://backend.mangoproxy.com/public-api/v1/traffic',
			{
				method: 'GET',
				headers: {
					'x-api-key':
						'mango_fd49e4bb0ee651047a557a0a81f0d08c9d1a2bc71b05032adb712ed488759ae9',
				},
			}
		)

		if (response.ok) {
			const AvailableTraffick = await response.json()
			return {
				success: true,

				AvailableTraffick: AvailableTraffick.availableMB,
			}
		} else {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка остановки парсера'
						: 'Parser stop error',
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

export async function GetBrightProxyTrafficAvalibale(
	language: 'RU' | 'EN'
): Promise<{
	success: boolean
	balance?: number
	pending_costs?: number
	message?: string
}> {
	try {
		const response = await fetch(
			'https://127.0.0.1:8000/v1/proxies/get_balance_bright_data',
			{
				method: 'GET',
			}
		)

		if (response.ok) {
			const data = await response.json()
			return {
				success: true,

				balance: data.balance,
				pending_costs: data.pending_costs,
			}
		} else {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка остановки парсера'
						: 'Parser stop error',
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
