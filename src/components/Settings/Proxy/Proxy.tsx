import { useState } from 'react'
import { useAuth } from '../../Other/authContext/useAuth'
import styles from './Proxy.module.css'
import { message } from 'antd'
import useCountries from '../../../hooks/UserHooks/useCountries'

const Proxy = () => {
    const { token } = useAuth()
    const [selectedCountryKey, setSelectedCountryKey] = useState<string | undefined>(undefined)
    const [_, setLoading] = useState(false)
    const [msgApi, contextHolder] = message.useMessage()

    const { countries, loading: loadingCountries } = useCountries(
        'https://api.autostructure.ru/v1/new_parser/get-all-available-country-zone',
        token
    )

    const handleSelectCountry = (key: string) => {
        setSelectedCountryKey(prev => (prev === key ? undefined : key))
    }

    const handleAddProxy = async () => {
        if (!selectedCountryKey) {
            msgApi.warning('Выберите страну')
            return
        }

        const selectedCountry = countries.find(c => c.key === selectedCountryKey)
        if (!selectedCountry) {
            msgApi.error('Страна не найдена')
            return
        }

        const payload = {
            countries: [
                {
                    name: selectedCountry.nameOfCountry,
                    region: selectedCountry.key
                }
            ]
        }

        try {
            setLoading(true)
            const response = await fetch('https://api.autostructure.ru/v1/new_parser/create-new-zones', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Ошибка при создании зоны')
            }

            msgApi.success('Прокси успешно добавлен')
        } catch (error: any) {
            msgApi.error(error.message || 'Произошла ошибка')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.Filters__container}>
            {contextHolder}
            <div className={styles.OutlineDiv}>
                {!loadingCountries &&
                    countries.map((country) => (
                        <div
                            key={country.key}
                            className={`${styles.Card} ${selectedCountryKey === country.key ? styles.Card__active : ''}`}
                            onClick={() => handleSelectCountry(country.key)}
                        >
                            <p className={`${styles.inter__medium} ${styles.Card__topPart_title}`}>
                                {country.nameOfCountry} ({country.key.toUpperCase()})
                            </p>
                        </div>
                    ))}
            </div>
           <div
                        onClick={() => handleAddProxy()}
                        className={`${styles.ProxyActions__Button} ${styles.inter__medium} ${styles.Card__bottomPart_texts}`}
                    >Добавить прокси</div>
        </div>
    )
}

export default Proxy