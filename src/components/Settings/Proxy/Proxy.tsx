import { useState } from 'react'
import { useAuth } from '../../Other/authContext/useAuth'
import styles from './Proxy.module.css'
import { message } from 'antd'
import useCountries from '../../../hooks/UserHooks/useCountries'

const Proxy = () => {
    const { token } = useAuth()
    const [selectedCountryKey, setSelectedCountryKey] = useState<string | undefined>(undefined)
    const [_, contextHolder] = message.useMessage()

    const { countries, loading: loadingCountries } = useCountries(
        'https://api.autostructure.ru/v1/new_parser/get-all-available-country-zone',
        token
    )

    const handleSelectCountry = (key: string) => {
        setSelectedCountryKey(prev => (prev === key ? undefined : key))
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
        </div>
    )
}

export default Proxy