import { useState } from 'react'

import { useAuth } from '../../Other/authContext/useAuth'
import { texts } from '../../Other/LanguageProvider/languages'
import { useLanguage } from '../../Other/LanguageProvider/useLanguage'
import styles from './Proxy.module.css'
import { message } from 'antd'
import useCountries from '../../../hooks/UserHooks/useCountries'

const Proxy = () => {
    const { language } = useLanguage()
    const { token } = useAuth()
    const [selectedCardId, setSelectedCardId] = useState<string | undefined>('')
    const [_, contextHolder] = message.useMessage()

    const { countries, loading: loadingCountries } = useCountries(
        'https://api.autostructure.ru/v1/new_parser/get-all-available-country-zone',
        token
    )

    const handleSelectCard = (filterId: string) => {
        if (selectedCardId === filterId) {
            setSelectedCardId(undefined)
        } else {
            setSelectedCardId(filterId)
        }
    }

    return (
        <div className={styles.Filters__container}>
            {contextHolder}
            <div className={styles.OutlineDiv}>
                {!loadingCountries &&
                    countries.map((country) => (
                        <div key={country.key} className={styles.Card}>
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