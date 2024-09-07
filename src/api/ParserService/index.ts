export async function ParserStart(
	filterId: string | null,
	token: string | null
): Promise<{ success: boolean; message: string }> {
	if (filterId === null) {
		return { success: false, message: 'Пожалуйста выберите фильтр' }
	}
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/new_parser/start/${filterId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.status === 200) {
			return { success: true, message: 'Парсер запущен' }
		} else if (response.status === 405) {
			return { success: false, message: 'Файл уже был спаршен' }
		} else {
			return { success: false, message: 'Ошибка запуска парсера' }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}

export async function ParserStop(
	token: string | null
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/new_parser/stop`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			return { success: true, message: 'Парсер остановлен' }
		} else {
			return { success: false, message: 'Ошибка остановки парсера' }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}
