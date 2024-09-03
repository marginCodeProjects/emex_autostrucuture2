


export async function ParserStart(
	filterId:string|null ,token:string|null
): Promise<{ success: boolean; message: string}> {
	try {
		
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/new_parser/start/${filterId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				'access-token':`${token}`
				},
			
			}
		)

		if (response.ok) {
			
		
			
			return { success: true, message: 'Успешный вход' }
		} else {
			const errorMessage = 'Ошибка запуска парсера'

			

			return { success: false, message: errorMessage }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}