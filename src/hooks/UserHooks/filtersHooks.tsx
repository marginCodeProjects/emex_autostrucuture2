import { useState, useEffect } from 'react';


// Типы данных для фильтров (адаптируйте под свою структуру данных)
interface FilterOption {
    id: string;
    title: string;
    deep_filter: number
    is_bigger: boolean
    logo: string
    deep_analog: number,
    analog: boolean,
    date: number,
    user_id: number
}

// Типы состояния
interface FiltersState {
    filters: FilterOption[];
    loading: boolean;
    error: string | null;
}

// Хук для получения фильтров
const useFilters = (endpoint: string, token: string | null): FiltersState => {
    const [filters, setFilters] = useState<FilterOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {

            try {
                setLoading(true);
                const response = await fetch(endpoint, {
                    method: "GET", headers: {
                        'Content-Type': 'application/json',
                        'access-token': `${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = await response.json();
                setFilters(data);
            } catch (err: unknown) { // Используем unknown вместо any
                if (err instanceof Error) {
                    setError(err.message || 'Ошибка при загрузке фильтров');
                } else {
                    setError('Неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, [endpoint, token]);

    return { filters, loading, error };
};

export default useFilters;