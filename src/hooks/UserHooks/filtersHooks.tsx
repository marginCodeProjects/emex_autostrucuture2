import  { useState, useEffect } from 'react';
import { FilterOption, FiltersState } from '../../interfaces/Main';


// Типы данных для фильтров (адаптируйте под свою структуру данных)


// Хук для получения фильтров
const useFilters = (endpoint: string, token: string | null): FiltersState => {
    const [filters, setFilters] = useState<FilterOption[] | undefined>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': `${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = await response.json();
                setFilters(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || 'Ошибка при загрузке');
                } else {
                    setError('Неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, [endpoint, token]);

    // Возвращаем setFilters для возможности изменения filters извне
    return { filters, setFilters, loading, error };
};

export default useFilters;