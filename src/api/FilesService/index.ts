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

export async function GetFilesBeforeParsing(
	token: string | null,
	file_id: number
): Promise<{ file?: Blob; success?: boolean }> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/files/download_file/before_parsing/${file_id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			// Парсим JSON только если запрос успешен
			const file: Blob = await response.json()
			return { file }
		} else {
			return { success: false }
		}
	} catch (error) {
		return { success: false }
	}
}

export async function GetFileAfterParsing(
	token: string | null,
	file_id: number
): Promise<{ file?: Blob; success?: boolean }> {
	try {
		const response = await fetch(
			`https://api.forprojectstests.ru/v1/files/download_file/after_parsing/${file_id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			// Парсим JSON только если запрос успешен
			const file: Blob = await response.json()
			return { file }
		} else {
			return { success: false }
		}
	} catch (error) {
		return { success: false }
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
