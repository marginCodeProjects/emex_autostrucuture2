import { useEffect, useState } from 'react'

interface CountryZone {
	key: string
	nameOfCountry: string
}

export default function useCountries(url: string, token: string | null) {
	const [countries, setCountries] = useState<CountryZone[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (token != null) {
					const res = await fetch(url, {
						headers: {
							accept: 'application/json',
							'access-token': token,
						},
					})
					const data = await res.json()
					setCountries(data)
				}
			} catch (error) {
				console.error('Error fetching countries:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url, token])

	return { countries, loading }
}
