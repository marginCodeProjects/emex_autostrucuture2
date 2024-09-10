import {
	Files,
	SessionTableAPI,
	SessionTableRowData,
} from '../../interfaces/Main'

export async function GetFiles(
	token: string | null,
	language: 'EN' | 'RU'
): Promise<{ success: boolean; files?: Files[]; message?: string }> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/files/all_files`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			// Парсим JSON только если запрос успешен
			const files: Files[] = await response.json()
			return { success: true, files }
		} else if (response.status == 404) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Вы ещё не загружали файлы'
						: "You haven't uploaded any files yet",
			}
		} else
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка сети или сервера'
						: 'Network or server error',
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

export async function ApplyVATCalculation(
	token: string | null,
	language: 'EN' | 'RU',file_id:number
): Promise<{ success: boolean; files?: Files[]; message?: string }> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/nds/edit/${file_id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			// Парсим JSON только если запрос успешен
			const files: Files[] = await response.json()
			return { success: true, files }
		} else if (response.status == 404) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Вы ещё не загружали файлы'
						: "You haven't uploaded any files yet",
			}
		}else if (response.status == 405) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Файл не может быть сохранён'
						: "The file cannot be saved",
			}
			
		}else if (response.status == 409) {
			return {
				success: false,
				message:
					language === 'RU'
						? 'К файлу уже был применён расчёт НДС'
						: "VAT calculation has already been applied to the file",
			}}
		 else
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка сети или сервера'
						: 'Network or server error',
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



export async function GetFileData(
	token: string | null,
	file_id: number | undefined,
	skip: number,
	limit: number,
	language: 'EN' | 'RU'
): Promise<{
	success: boolean
	rows?: SessionTableRowData[]
	totalRows: number
	message?: string
}> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/showing/show_data/${file_id}?skip=${skip}&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			// Парсим JSON только если запрос успешен
			const data: SessionTableAPI = await response.json()
			return { success: true, rows: data.rows, totalRows: data.total }
		} else {
			return {
				success: false,
				message:
					language === 'RU'
						? 'Ошибка загрузки таблицы'
						: 'Table loading error',
				rows: [],
				totalRows: 0,
			}
		}
	} catch (error) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Ошибка сети или сервера'
					: 'Network or server error',
			rows: [],
			totalRows: 0,
		}
	}
}
