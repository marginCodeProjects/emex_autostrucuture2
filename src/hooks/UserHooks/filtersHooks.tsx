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
const useFilters = (endpoint: string): FiltersState => {
    const [filters, setFilters] = useState<FilterOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const response = await fetch(endpoint, {
                    method: "GET", credentials: 'include', headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = await response.json();
                setFilters(data); 
            } catch (err: any) {
                setError(err.message || 'Ошибка при загрузке фильтров');
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, [endpoint]);

    return { filters, loading, error };
};

export default useFilters;