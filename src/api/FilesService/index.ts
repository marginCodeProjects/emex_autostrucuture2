import {
	Files,
	SessionTableAPI,
	SessionTableRowData,
} from '../../interfaces/Main'

const API_URL = 'https://api.autostructure.ru/v1'

async function fetchAPI<T>(
	path: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	token: string | null,
	body?: object
): Promise<T> {
	try {
		const response = await fetch(`${API_URL}${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'access-token': token || '',
			},
			body: body ? JSON.stringify(body) : undefined,
		})

		const data = await response.json()
		if (!response.ok) throw new Error(data?.message || 'Ошибка запроса')

		return data
	} catch (error) {
		console.error(`Ошибка в запросе ${method} ${path}:`, error)
		throw error
	}
}

export async function GetFiles(
	token: string | null,
	language: 'EN' | 'RU'
): Promise<{ success: boolean; files?: Files[]; message?: string }> {
	try {
		const files = await fetchAPI<Files[]>('/files/all_files', 'GET', token)
		return { success: true, files }
	} catch (error) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Ошибка загрузки файлов'
					: 'File loading error',
		}
	}
}

export async function ApplyVATCalculation(
	token: string | null,
	language: 'EN' | 'RU',
	file_id: number
): Promise<{ success: boolean; files?: Files[]; message?: string }> {
	try {
		const files = await fetchAPI<Files[]>(
			`/nds/edit/${file_id}`,
			'GET',
			token
		)
		return { success: true, files }
	} catch (error: any) {
		const messageMap: Record<number, string> = {
			404:
				language === 'RU'
					? 'Вы ещё не загружали файлы'
					: "You haven't uploaded any files yet",
			405:
				language === 'RU'
					? 'Файл не может быть сохранён'
					: 'The file cannot be saved',
			409:
				language === 'RU'
					? 'К файлу уже был применён расчёт НДС'
					: 'VAT calculation has already been applied',
		}

		const status = (error as { status?: number })?.status ?? 0
		return {
			success: false,
			message: messageMap[status] || 'Ошибка сети или сервера',
		}
	}
}

export async function GetFileData(
	token: string | null,
	fileName: string | undefined,
	skip: number,
	limit: number,
	language: 'EN' | 'RU'
): Promise<{
	success: boolean
	rows?: SessionTableRowData[]
	totalRows: number
	message?: string
}> {
	if (!fileName) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Некорректное имя файла'
					: 'Invalid file name',
			rows: [],
			totalRows: 0,
		}
	}
	try {
		const data = await fetchAPI<SessionTableAPI>(
			`/showing/show_data/${fileName}?skip=${skip}&limit=${limit}`,
			'GET',
			token
		)
		return { success: true, rows: data.rows, totalRows: data.total }
	} catch (error) {
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
}

export async function DeleteFiles(
	token: string | null,
	ids: string[],
	language: 'EN' | 'RU'
): Promise<{ success: boolean; files?: Files[]; message?: string }> {
	try {
		const files = await fetchAPI<Files[]>(
			'/files/delete_files',
			'DELETE',
			token,
			ids
		)
		return { success: true, files }
	} catch (error) {
		return {
			success: false,
			message:
				language === 'RU'
					? 'Ошибка удаления файлов'
					: 'File deletion error',
		}
	}
}
