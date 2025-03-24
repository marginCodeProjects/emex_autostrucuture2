import { FilterFormValues, FilterOption } from '../../interfaces/Main'

const API_URL = 'https://api.autostructure.ru/v1/filters'

async function request<T>(
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	path: string,
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

		if (!response.ok) {
			throw new Error(data?.message || 'Ошибка запроса')
		}

		return data
	} catch (error) {
		console.error(`Ошибка в запросе ${method} ${path}:`, error)
		throw error
	}
}

export async function DeleteFilter(token: string | null, filter_id: string) {
	return request<FilterOption[]>(`DELETE`, `/delete_filter/${filter_id}`, token)
}

export async function EditFilter(
	token: string | null,
	filter_id: string,
	values: FilterFormValues,
	language: 'RU' | 'EN'
) {
	const data = await request<FilterOption[]>('PATCH', `/edit_filter/${filter_id}`, token, values)

	return {
		status: true,
		Message: language === 'RU' ? 'Данные успешно изменены' : 'Data successfully changed',
		Filters: data,
	}
}

export async function CreateFilter(
	token: string | null,
	values: FilterFormValues,
	language: 'RU' | 'EN'
) {
	const data = await request<FilterOption[]>('POST', `/create_filter`, token, values)

	return {
		status: true,
		Message: language === 'RU' ? 'Фильтр успешно добавлен' : 'Filter successfully added',
		Filters: data,
	}
}

export async function GetFilterByID(token: string | null, id: string | null, language: 'RU' | 'EN') {
	if (!id) {
		return {
			status: false,
			Message: language === 'RU' ? 'Некорректный ID фильтра' : 'Invalid filter ID',
		}
	}

	const data = await request<FilterOption>('GET', `/get_filter/${id}`, token)

	return {
		status: true,
		Message: language === 'RU' ? 'Фильтр успешно получен' : 'Filter successfully retrieved',
		Filter: data,
	}
}