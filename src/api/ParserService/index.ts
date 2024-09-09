export async function ParserStart(
	filterId: string | null,
	token: string | null,language:"RU"|"EN"
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
			return { success: true, message:language === "RU"? 'Парсер запущен':'Parser is up and running' }
		} else if (response.status === 405) {
			return { success: false, message:language === "RU"? 'Файл уже был спаршен':'The file has already been sparred' }
		} else if (response.status === 409) {
			return { success: false, message:language === "RU"? 'Все прокси в бане':'All proxies are banned' }}
		 else {
			return { success: false, message:language === "RU"? 'Ошибка запуска парсера':'Parser start error' }
		}
	} catch (error) {
		return { success: false, message:language === "RU"? 'Ошибка сети или сервера':'Network or server error' }
	}
}

export async function ParserStop(
	token: string | null,language:"RU"|"EN"
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
			return { success: true, message:language === "RU"? 'Парсер остановлен':'Parser stopped' }
		} else {
			return { success: false, message:language === "RU"? 'Ошибка остановки парсера':'Parser stop error' }
		}
	} catch (error) {
		return { success: false, message:language === "RU"? 'Ошибка сети или сервера':'Network or server error' }
	}
}
