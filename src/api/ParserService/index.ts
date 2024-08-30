


export async function ParserStart(
	filterId:string|null ,token:string|null
): Promise<{ success: boolean; message: string}> {
	try {
		
		const response = await fetch(
			`https://127.0.0.1:8000/v1/new_parser/start/${filterId}`,
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
			let errorMessage = 'Ошибка запуска парсера'

			

			return { success: false, message: errorMessage }
		}
	} catch (error) {
		return { success: false, message: 'Ошибка сети или сервера' }
	}
}