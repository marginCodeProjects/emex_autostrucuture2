import { FilterFormValues, FilterOption } from '../../interfaces/Main'

export async function DeleteFilter(
	token: string | null,
	filter_id: string
): Promise<FilterOption[] | undefined> {
	const response = await fetch(
		`https://127.0.0.1:8000/v1/filters/delete_filter/${filter_id}`,
		{
			method: 'DELETE',

			headers: {
				'Content-Type': 'application/json',
				'access-token': `${token}`,
			},
		}
	)

	if (response.ok) {
		const Filters: FilterOption[] = await response.json()
		return Filters
	} else {
		return undefined
	}
}

export async function EditFilter(
	token: string | null,
	filter_id: string,
	FilterFormValues: FilterFormValues,
	language: 'RU' | 'EN'
): Promise<{
	status: boolean
	Message: string
	Filters?: FilterOption[]
}> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/filters/edit_filter/${filter_id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					deep_filter: FilterFormValues.deep_filter,
					deep_analog: FilterFormValues.deep_analog,
					analog: FilterFormValues.analog,
					title: FilterFormValues.title,
					is_bigger: FilterFormValues.is_bigger,
					date: FilterFormValues.date,
					logo: FilterFormValues.logo,
					pickup_point: FilterFormValues.pickup_point,
				}),
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const Filters = await response.json()

			return {
				status: true,
				Message:
					language === 'RU'
						? 'Данные успешно изменены'
						: 'Data successfully changed',
				Filters: Filters,
			}
		} else {
			return {
				status: false,
				Message:
					language === 'RU'
						? 'Произошла ошибка'
						: 'There was an error',
			}
		}
	} catch (error) {
		return {
			status: false,
			Message:
				language === 'RU' ? 'Произошла ошибка' : 'There was an error',
		}
	}
}
export async function CreateFilter(
	token: string | null,
	FilterFormValues: FilterFormValues,
	language: 'RU' | 'EN'
): Promise<{
	status: boolean
	Message: string
	Filters?: FilterOption[]
}> {
	try {
		const response = await fetch(
			`https://127.0.0.1:8000/v1/filters/create_filter`,
			{
				method: 'POST',
				body: JSON.stringify({
					deep_filter: FilterFormValues.deep_filter,
					deep_analog: FilterFormValues.deep_analog,
					analog: FilterFormValues.analog,
					title: FilterFormValues.title,
					is_bigger: FilterFormValues.is_bigger,
					date: FilterFormValues.date,
					logo: FilterFormValues.logo,
					pickup_point: FilterFormValues.pickup_point,
				}),
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${token}`,
				},
			}
		)

		if (response.ok) {
			const Filters = await response.json()

			return {
				status: true,
				Message:
					language === 'RU'
						? 'Фильтр успешно добавлен'
						: 'Filter successfully added',
				Filters: Filters,
			}
		} else {
			return {
				status: false,
				Message:
					language === 'RU'
						? 'Произошла ошибка'
						: 'There was an error',
			}
		}
	} catch (error) {
		return {
			status: false,
			Message:
				language === 'RU' ? 'Произошла ошибка' : 'There was an error',
		}
	}
}
